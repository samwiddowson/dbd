import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "../../interfaces/MapParserStrategy"
import type { UdmfMapData } from "./interfaces/MapData"

export class UdmfMapParser implements MapParserStrategy {
    format = "UDMF"
    mapData: UdmfMapData

    constructor(mapData: UdmfMapData) {
        this.mapData = mapData
    }

    parseMap() {
        return new ParsedMap("name")
    }
}
