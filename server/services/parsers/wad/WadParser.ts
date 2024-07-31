import log from "~/server/utils/log"
import type MapData from "../map/strategies/interfaces/MapData"
import { MapLumps } from "../map/strategies/interfaces/MapData"
import readWadLumpText from "./readWadLumpText"
import type WadTextureData from "./interfaces/WadTextureData"

interface Header {
    identification: string
    numlumps: number
    infotableofs: number
}

interface DirectoryEntry {
    filepos: number
    size: number
    name: string
}

export default class WadParser {
    rawData: Buffer
    header: Header | undefined
    directory: DirectoryEntry[] = []

    #readHeader() {
        return {
            identification: this.rawData.toString("ascii", 0, 4),
            numlumps: this.rawData.readIntLE(4, 4),
            infotableofs: this.rawData.readIntLE(8, 4),
        }
    }

    *#rawDirectoryReader() {
        const entryOffset = this.header!.infotableofs
        for (let i = 0; i < this.header!.numlumps; i++) {
            const filePosOffset = entryOffset + i * 16
            const sizeOffset = filePosOffset + 4
            const nameOffset = sizeOffset + 4

            const entry: DirectoryEntry = {
                filepos: this.rawData.readIntLE(filePosOffset, 4),
                size: this.rawData.readIntLE(sizeOffset, 4),
                name: readWadLumpText(this.rawData, nameOffset),
            }
            yield entry
        }
    }

    *#lumpDirectory() {
        for (let i = 0; i < this.directory!.length; i++) {
            yield this.directory[i]
        }
    }

    constructor(rawData: Buffer) {
        this.rawData = rawData
        this.header = this.#readHeader()
        const directoryEntries = this.#rawDirectoryReader()
        let entry = directoryEntries.next()
        while (!entry.done) {
            this.directory.push(entry.value)
            entry = directoryEntries.next()
        }
    }

    #getLumpData(lumpInfo: DirectoryEntry) {
        const lumpData = Buffer.from(
            this.rawData.buffer,
            lumpInfo.filepos,
            lumpInfo.size
        )
        //TODO: check lump data is of expected length and throw error if not
        return lumpData
    }

    #getMapData(
        mapLumpInfo: DirectoryEntry,
        lumpDirectoryIterator: Generator<DirectoryEntry>
    ) {
        //found a map
        const mapName = mapLumpInfo.name

        const firstResult = lumpDirectoryIterator.next()
        if (firstResult.done) {
            throw new Error(
                `No further map lumps found after map marker for ${mapName}`
            )
        }

        if (firstResult.value.name === "THINGS") {
            //the map info is stored in the legacy style
            const thingsEntry = firstResult.value

            log.debug(
                "processing things lump from directory info:",
                thingsEntry
            )

            const thingsLump = this.#getLumpData(thingsEntry)

            lumpDirectoryIterator.next() // LINEDEFS

            const sidedefsResult = lumpDirectoryIterator.next()
            if (sidedefsResult.done) {
                throw new Error(
                    "No further map lumps found when looking for SIDEDEFS lump"
                )
            }
            const sidedefsEntry = sidedefsResult.value
            if (sidedefsEntry.name !== "SIDEDEFS") {
                throw new Error(
                    `Unexpected lump name in WAD directory: ${sidedefsEntry.name}`
                )
            }
            log.debug(
                "processing sidedefs lump from directory info:",
                sidedefsEntry
            )
            const sidedefsLump = this.#getLumpData(sidedefsEntry)

            lumpDirectoryIterator.next() // VERTEXES
            lumpDirectoryIterator.next() // SEGS
            lumpDirectoryIterator.next() // SSECTORS
            lumpDirectoryIterator.next() // NODES
            const sectorsResult = lumpDirectoryIterator.next()
            if (sectorsResult.done) {
                throw new Error(
                    "No further map lumps found when looking for SECTORS lump"
                )
            }
            const sectorsEntry = sectorsResult.value
            if (sectorsEntry.name !== "SECTORS") {
                throw new Error(
                    `Unexpected lump name in WAD directory: ${sectorsEntry.name}`
                )
            }
            log.debug(
                "processing sectors lump from directory info:",
                sectorsEntry
            )
            const sectorsLump = this.#getLumpData(sectorsEntry)
            return {
                name: mapName,
                data: new MapLumps(thingsLump, sidedefsLump, sectorsLump),
            }
        } else {
            //find the TEXTMAP
            //

            const nextLump = firstResult.value
            while (nextLump.name != "ENDMAP") {
                if (nextLump.name === "TEXTMAP") {
                    const textmap = nextLump
                    const endAddress = textmap.filepos + textmap.size
                    return {
                        name: mapName,
                        data: this.rawData.toString(
                            "ascii",
                            textmap.filepos,
                            endAddress
                        ),
                    }
                }
                const nextResult = lumpDirectoryIterator.next()
                if (nextResult.done) {
                    throw new Error(
                        `Unexpected ENDMAP when searching for TEXTMAP in ${mapName}`
                    )
                }
            }
        }
    }

    getMapData() {
        // TODO:
        // * Read and parse MAPINFO lump if exist (to get list of map lump names)
        // * refer to dictionary
        //
        // * for every MAPxx or ExMy marker,
        //   * if next lump is THINGS grab that, SIDEDEFS and SECTORS and add to a MapLumps object
        //   * otherwise find the next ENDMAP marker and get the TEXTMAP between those; read this as a string
        //   * create a MapData object and append it to a MapData[] array
        //
        const m: MapData[] = []
        const lumpDirectoryIterator = this.#lumpDirectory()
        let iteratorResult = lumpDirectoryIterator.next()
        while (!iteratorResult.done) {
            const lump = iteratorResult.value

            if (
                lump.name.match(/MAP[0-9]{2}/) ||
                lump.name.match(/E[0-9]M[0-9]}/)
            ) {
                const mapData = this.#getMapData(lump, lumpDirectoryIterator)
                if (!mapData) {
                    throw new Error(
                        `unexpected empty mapdata for map ${lump.name}`
                    )
                }
                m.push(mapData)
            }
            iteratorResult = lumpDirectoryIterator.next()
        }

        return m
    }

    getResourceData() {
        const lumpDirectoryIterator = this.#lumpDirectory()
        let texture1Lump: Buffer | undefined
        let texture2Lump: Buffer | undefined
        let patchesLump: Buffer | undefined
        let iteratorResult = lumpDirectoryIterator.next()
        while (!iteratorResult.done) {
            const lump = iteratorResult.value
            log.debug("iterated lump", lump.name)

            if (lump.name === "TEXTURE1") {
                if (texture1Lump) {
                    throw new Error("Multiple lumps found with name TEXTURE1")
                }
                texture1Lump = this.#getLumpData(lump)
            } else if (lump.name === "TEXTURE2") {
                if (texture2Lump) {
                    throw new Error("Multiple lumps found with name TEXTURE2")
                }
                texture2Lump = this.#getLumpData(lump)
            } else if (lump.name === "PNAMES") {
                patchesLump = this.#getLumpData(lump)
            }
            iteratorResult = lumpDirectoryIterator.next()
        }

        const texturexLump = Buffer.concat([
            texture1Lump ?? new Uint8Array(),
            texture2Lump ?? new Uint8Array(),
        ])

        return {
            texturex: texturexLump,
            patches: patchesLump,
        }
    }
}
