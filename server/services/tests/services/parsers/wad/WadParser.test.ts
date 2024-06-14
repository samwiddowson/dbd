import path from "node:path"
import { readFile } from "node:fs/promises"
import { expect, it, describe } from "vitest"
import WadParser from "~/server/services/parsers/wad/WadParser"

const testFilePath = path.join(__dirname, "testdata", "lumpmap.wad")
// console.log(testFilePath)

describe("WadParser", () => {
    it("creates successfully", () => {
        const wadParser = new WadParser(Buffer.alloc(5, "a"))

        expect(wadParser.rawData.toString()).toBe("aaaaa")
    })

    it("reads header and directory from the buffer", async () => {
        const fileData = await readFile(testFilePath)
        const wadParser = new WadParser(fileData)

        wadParser.parse()
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
    })
})
