import { describe, it, expect } from "vitest"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"
import textMap from "./example-resources/text-map"

const dummyMapData = { name: "MAP99", data: "test map data" }

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
    })
})
