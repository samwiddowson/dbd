import log from "~/server/utils/log"
import type MapData from "../map/strategies/interfaces/MapData"
import { MapLumps } from "../map/strategies/interfaces/MapData"
import readWadLumpText from "./readWadLumpText"

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

    *#directoryEntryReader() {
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

    constructor(rawData: Buffer) {
        this.rawData = rawData
        this.header = this.#readHeader()
        const directoryEntries = this.#directoryEntryReader()
        let entry = directoryEntries.next()
        while (!entry.done) {
            this.directory.push(entry.value)
            entry = directoryEntries.next()
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
        for (let i = 0; i < this.directory.length; i++) {
            if (
                this.directory[i].name.match(/MAP[0-9]{2}/) ||
                this.directory[i].name.match(/E[0-9]M[0-9]}/)
            ) {
                //found a map
                const mapName = this.directory[i].name

                i++

                if (this.directory[i].name === "THINGS") {
                    log.debug(
                        "processing things lump from directory info:",
                        this.directory[i]
                    )
                    //this is a lump map
                    const thingsLump = Buffer.from(
                        this.rawData.buffer,
                        this.directory[i].filepos,
                        this.directory[i].size
                    )

                    i += 2 //should be SIDEDEFS
                    if (this.directory[i].name !== "SIDEDEFS") {
                        throw new Error(
                            `Unexpected lump name in WAD directory: ${this.directory[i].name}`
                        )
                    }
                    log.debug(
                        "processing sidedefs lump from directory info:",
                        this.directory[i]
                    )
                    const sidedefsLump = Buffer.from(
                        this.rawData.buffer,
                        this.directory[i].filepos,
                        this.directory[i].size
                    )

                    i += 5 //should be SECTORS
                    if (this.directory[i].name !== "SECTORS") {
                        throw new Error(
                            `Unexpected lump name in WAD directory: ${this.directory[i].name}`
                        )
                    }
                    log.debug(
                        "processing sectors lump from directory info:",
                        this.directory[i]
                    )
                    const sectorsLump = Buffer.from(
                        this.rawData.buffer,
                        this.directory[i].filepos,
                        this.directory[i].size
                    )

                    m.push({
                        name: mapName,
                        data: new MapLumps(
                            thingsLump,
                            sidedefsLump,
                            sectorsLump
                        ),
                    })
                } else {
                    //find the TEXTMAP
                    while (this.directory[i].name != "ENDMAP") {
                        if (this.directory[i].name === "TEXTMAP") {
                            const endAddress =
                                this.directory[i].filepos +
                                this.directory[i].size
                            m.push({
                                name: mapName,
                                data: this.rawData.toString(
                                    "ascii",
                                    this.directory[i].filepos,
                                    endAddress
                                ),
                            })
                        }
                        i++
                    }
                }
            }
        }
        return m
    }
}
