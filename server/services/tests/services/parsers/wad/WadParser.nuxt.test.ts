import path from "node:path"
import { readFile } from "node:fs/promises"
import { expect, it, describe } from "vitest"
import WadParser from "~/server/services/parsers/wad/WadParser"
import { MapLumps } from "~/server/services/parsers/map/strategies/interfaces/MapData"

describe("WadParser - lump map", () => {
    const testLumpFilePath = path.join(__dirname, "testdata", "lumpmap.wad")
    it("reads header and directory from the buffer", async () => {
        const fileData = await readFile(testLumpFilePath)
        const wadParser = new WadParser(fileData)

        expect(wadParser.header).not.toBe(undefined)
        expect(wadParser.header!.identification).toBe("PWAD")
        expect(wadParser.header!.numlumps).toBe(11)

        expect(wadParser.directory.length).toBe(wadParser.header!.numlumps)
        expect(wadParser.directory[0].name).toBe("MAP01")
        expect(wadParser.directory[1].name).toBe("THINGS")
        expect(wadParser.directory[2].name).toBe("LINEDEFS")
        expect(wadParser.directory[3].name).toBe("SIDEDEFS")
        expect(wadParser.directory[4].name).toBe("VERTEXES")
        expect(wadParser.directory[5].name).toBe("SEGS")
        expect(wadParser.directory[6].name).toBe("SSECTORS")
        expect(wadParser.directory[7].name).toBe("NODES")
        expect(wadParser.directory[8].name).toBe("SECTORS")
        expect(wadParser.directory[9].name).toBe("REJECT")
        expect(wadParser.directory[10].name).toBe("BLOCKMAP")

        const mapData = wadParser.getMapData()
        expect(mapData.length).toBe(1)
        const m = mapData.pop()

        expect(m!.name).toBe("MAP01")

        const d = m!.data as MapLumps
        expect(m!.data).toBeInstanceOf(MapLumps)
        expect(d.things.length).toBe(wadParser.directory[1].size)
        expect(d.sidedefs.length).toBe(wadParser.directory[3].size)
        expect(d.sectors.length).toBe(wadParser.directory[8].size)
    })

    //TODO -- error handling
})

describe("WadParser - udmf map", () => {
    const testUdmfFilePath = path.join(__dirname, "testdata", "udmfmap.wad")
    it("reads header and directory from the buffer", async () => {
        const fileData = await readFile(testUdmfFilePath)
        const wadParser = new WadParser(fileData)

        expect(wadParser.header).not.toBe(undefined)
        expect(wadParser.header!.identification).toBe("PWAD")
        expect(wadParser.header!.numlumps).toBe(4)

        expect(wadParser.directory.length).toBe(wadParser.header!.numlumps)
        expect(wadParser.directory[0].name).toBe("MAP01")
        expect(wadParser.directory[1].name).toBe("TEXTMAP")
        expect(wadParser.directory[2].name).toBe("ZNODES")
        expect(wadParser.directory[3].name).toBe("ENDMAP")

        const mapData = wadParser.getMapData()
        expect(mapData.length).toBe(1)
        const m = mapData.pop()

        expect(m!.name).toBe("MAP01")

        const d = m!.data as string
        expect(d.length).toBe(wadParser.directory[1].size)
    })
    //TODO -- error handling
})

describe("WadParser - resource data", () => {
    const testResourceFilePath = path.join(
        __dirname,
        "testdata",
        "textures.wad"
    )
    it("reads resource data", async () => {
        const fileData = await readFile(testResourceFilePath)
        const wadParser = new WadParser(fileData)

        expect(wadParser.header).not.toBe(undefined)
        expect(wadParser.header!.identification).toBe("PWAD")
        expect(wadParser.header!.numlumps).toBe(6)

        expect(wadParser.directory.length).toBe(wadParser.header!.numlumps)
        expect(wadParser.directory[0].name).toBe("P_START")
        expect(wadParser.directory[1].name).toBe("DFPLN05")
        expect(wadParser.directory[2].name).toBe("OTECHB01")
        expect(wadParser.directory[3].name).toBe("P_END")
        expect(wadParser.directory[4].name).toBe("PNAMES")
        expect(wadParser.directory[5].name).toBe("TEXTURE1")

        const resourceData = wadParser.getResourceData()
        expect(resourceData.patches?.length).toBe(wadParser.directory[4].size)
        expect(resourceData.texturex?.length).toBe(wadParser.directory[5].size)
    })
})
