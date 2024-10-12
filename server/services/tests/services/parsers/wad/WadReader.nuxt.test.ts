import path from "node:path"
import { readFile } from "node:fs/promises"
import { expect, it, describe } from "vitest"
import WadReader from "~/server/services/parsers/wad/WadReader"
import { MapLumps } from "~/server/services/parsers/map/strategies/interfaces/MapData"

describe("WadReader - lump map", () => {
    const testLumpFilePath = path.join(__dirname, "testdata", "lumpmap.wad")
    it("reads header and directory from the buffer", async () => {
        const fileData = await readFile(testLumpFilePath)
        const wadReader = new WadReader(fileData)

        expect(wadReader.header).not.toBe(undefined)
        expect(wadReader.header?.identification).toBe("PWAD")
        expect(wadReader.header?.numlumps).toBe(11)

        expect(wadReader.directory.length).toBe(wadReader.header!.numlumps)
        expect(wadReader.directory[0].name).toBe("MAP01")
        expect(wadReader.directory[1].name).toBe("THINGS")
        expect(wadReader.directory[2].name).toBe("LINEDEFS")
        expect(wadReader.directory[3].name).toBe("SIDEDEFS")
        expect(wadReader.directory[4].name).toBe("VERTEXES")
        expect(wadReader.directory[5].name).toBe("SEGS")
        expect(wadReader.directory[6].name).toBe("SSECTORS")
        expect(wadReader.directory[7].name).toBe("NODES")
        expect(wadReader.directory[8].name).toBe("SECTORS")
        expect(wadReader.directory[9].name).toBe("REJECT")
        expect(wadReader.directory[10].name).toBe("BLOCKMAP")

        const mapData = wadReader.getMapData()
        expect(mapData.length).toBe(1)
        const m = mapData.pop()

        expect(m!.name).toBe("MAP01")

        const d = m?.data as MapLumps
        expect(m?.data).toBeInstanceOf(MapLumps)
        expect(d.things.length).toBe(wadReader.directory[1].size)
        expect(d.sidedefs.length).toBe(wadReader.directory[3].size)
        expect(d.sectors.length).toBe(wadReader.directory[8].size)
    })

    //TODO -- error handling
})

describe("WadReader - udmf map", () => {
    const testUdmfFilePath = path.join(__dirname, "testdata", "udmfmap.wad")
    it("reads header and directory from the buffer", async () => {
        const fileData = await readFile(testUdmfFilePath)
        const wadReader = new WadReader(fileData)

        expect(wadReader.header).not.toBe(undefined)
        expect(wadReader.header?.identification).toBe("PWAD")
        expect(wadReader.header?.numlumps).toBe(4)

        expect(wadReader.directory.length).toBe(wadReader.header!.numlumps)
        expect(wadReader.directory[0].name).toBe("MAP01")
        expect(wadReader.directory[1].name).toBe("TEXTMAP")
        expect(wadReader.directory[2].name).toBe("ZNODES")
        expect(wadReader.directory[3].name).toBe("ENDMAP")

        const mapData = wadReader.getMapData()
        expect(mapData.length).toBe(1)
        const m = mapData.pop()

        expect(m!.name).toBe("MAP01")

        const d = m!.data as string
        expect(d.length).toBe(wadReader.directory[1].size)
    })
    //TODO -- error handling
})

describe("WadReader - resource data", () => {
    const testResourceFilePath = path.join(
        __dirname,
        "testdata",
        "textures.wad"
    )
    it("reads resource data", async () => {
        const fileData = await readFile(testResourceFilePath)
        const wadReader = new WadReader(fileData)

        expect(wadReader.header).not.toBe(undefined)
        expect(wadReader.header!.identification).toBe("PWAD")
        expect(wadReader.header!.numlumps).toBe(6)

        expect(wadReader.directory.length).toBe(wadReader.header!.numlumps)
        expect(wadReader.directory[0].name).toBe("P_START")
        expect(wadReader.directory[1].name).toBe("DFPLN05")
        expect(wadReader.directory[2].name).toBe("OTECHB01")
        expect(wadReader.directory[3].name).toBe("P_END")
        expect(wadReader.directory[4].name).toBe("PNAMES")
        expect(wadReader.directory[5].name).toBe("TEXTURE1")

        const resourceData = wadReader.getResourceData()
        expect(resourceData.patches?.length).toBe(wadReader.directory[4].size)
        expect(resourceData.textures?.length).toBe(wadReader.directory[5].size)
        const patches = resourceData.patchLumpsList
        expect(patches.length).toBe(2)
        expect(patches[0]).toBe("DFPLN05")
        expect(patches[1]).toBe("OTECHB01")
    })
})
