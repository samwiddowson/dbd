import { describe, it, expect } from "vitest"
import MapParser from "~/server/services/parsers/map/MapParser"
import { MapLumps } from "~/server/services/parsers/map/strategies/interfaces/MapData"

describe("MapParser", () => {
    it("Implements a UdmfMapParser strategy when given a string[] array", () => {
        const mapData = { name: "MAP99", data: "test map data" }
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("UDMF")
    })

    it("Implements a LumpMapParser strategy when given a Buffer", () => {
        const mapLumps = new MapLumps(
            Buffer.from("test things string"),
            Buffer.from("test sidedefs string"),
            Buffer.from("test sectors string")
        )
        const mapData = { name: "MAP99", data: mapLumps }
        const mapParser = new MapParser(mapData)

        expect(mapParser.strategy.format).toBe("Lump")
    })
})
