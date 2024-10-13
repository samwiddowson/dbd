import log from "~/server/utils/log"
import { describe, it, expect } from "vitest"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"
import textMap from "./testdata/text-map"
import { Parser } from "simple-text-parser"

const dummyMapData = { name: "MAP99", data: "test map data" }

//leaving this in to refer back to as it demonstrates how the text parser works
describe("playing with simple-text-parser", () => {
    it("finds the sector body", () => {
        const parser = new Parser()
        parser.addRule(/sector[\n\s]*{([^}]*)}/gi, function (_, body) {
            return { type: "sector", body: body.trim() }
        })

        const tree = parser.toTree(`
                                   asd;glkjsg
                                   sector
                                   {
                                       hello this bit
                                   }
                                   `)

        const sectors = tree.filter((x) => x.type == "sector")

        expect(sectors.length).toBe(1)
        expect(sectors[0].type).toBe("sector")
        expect(sectors[0].body).toBe("hello this bit")
    })
})

describe("UdmfMapParser", () => {
    it("correctly stores the mapData when created", () => {
        const parser = new UdmfMapParser(dummyMapData)
        expect(parser.mapData).toEqual(dummyMapData)
    })

    it("correctly identifies full list of textures", () => {
        const textMapData = { name: "MAP77", data: textMap }
        const parser = new UdmfMapParser(textMapData)
        const parsedMapData = parser.parseMap()

        expect(parsedMapData.name).toBe("MAP77")
        expect(parsedMapData.textureCounts).toEqual({
            STARTAN2: 7,
            STARTAN3: 1,
            ASHWALL3: 1,
            BIGBRIK1: 1,
            BIGDOOR3: 1,
            BSTONE1: 1,
            FLOOR0_1: 3,
            CEIL1_1: 3,
        })
        expect(parsedMapData.doomednumCounts).toEqual({
            "1": 1,
            "2003": 1,
            "2019": 1,
            "65": 2,
        })
    })
})
