import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "~/server/services/parsers/map/strategies/interfaces/MapParserStrategy"

export class UdmfMapParser implements MapParserStrategy {
    format = "UDMF"
    mapData: string[]

    constructor(mapData: string[]) {
        this.mapData = mapData
    }

    parseMap() {
        return new ParsedMap("name")
    }
}
