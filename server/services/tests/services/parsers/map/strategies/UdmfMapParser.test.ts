import { describe, it, expect } from "vitest"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"
import textMap from "./example-resources/text-map"

const dummyMapData = ["line1", "line2"]

describe("UdmfMapParser", () => {
    it("correctly stores the mapData when created", () => {
        const parser = new UdmfMapParser(dummyMapData)
        expect(parser.mapData).toEqual(dummyMapData)
    })

    it("correctly identifies full list of textures", () => {
        const parser = new UdmfMapParser(textMap.split(" "))
        const parsedMapData = parser.parseMap()

        expect(parsedMapData.name).toBe("name")
    })
})
