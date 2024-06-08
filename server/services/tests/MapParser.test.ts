import { describe, it, expect, vi, expectTypeOf } from "vitest"
import MapParser from "../parsers/MapParser"

describe("MapParser", () => {
    it("Implements a UdmfMapParser strategy when given a string[] array", () => {
        const mapData = ["test1", "test2"]
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("UDMF")
    })

    it("Implements a LumpMapParser strategy when given a Buffer", () => {
        const mapData = Buffer.from("test string")
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("Lump")
    })
})
