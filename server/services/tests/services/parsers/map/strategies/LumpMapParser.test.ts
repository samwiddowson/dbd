import path from "node:path"
import { readFile } from "node:fs/promises"
import { describe, it, expect } from "vitest"
import { LumpMapParser } from "~/server/services/parsers/map/strategies/LumpMapParser"

function getLumpFile(lumpName: string) {
    return path.join(__dirname, "testdata", `${lumpName}.lmp`)
}

describe("LumpMapParser", () => {
    it("correctly parses map", async () => {
        const testMapData = {
            name: "MAP02",
            data: {
                things: await readFile(getLumpFile("THINGS")),
                sidedefs: await readFile(getLumpFile("SIDEDEFS")),
                sectors: await readFile(getLumpFile("SECTORS")),
            },
        }
        const parser = new LumpMapParser(testMapData)

        const mapData = parser.parseMap()

        expect(mapData.textureCounts).toEqual({
            BIGDOOR1: 1,
            BFALL1: 1,
            STARTAN2: 5,
            FLOOR0_1: 2,
            CEIL1_1: 1,
            CEIL1_2: 1,
        })
        expect(mapData.doomednumCounts).toEqual({
            "1": 1,
            "2001": 1,
            "13": 1,
        })
    })
})
