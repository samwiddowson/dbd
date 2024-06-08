import { describe, it, expect, vi, expectTypeOf } from "vitest"
import MapParser from "~/server/services/parsers/map/MapParser"

describe("MapParser", () => {
    it("Implements a UdmfMapParser strategy when given a string[] array", () => {
        const mapData = { name: "MAP99", data: ["test1", "test2"] }
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("UDMF")
    })

    it("Implements a LumpMapParser strategy when given a Buffer", () => {
        const mapData = { name: "MAP99", data: Buffer.from("test string") }
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("Lump")
    })
})
