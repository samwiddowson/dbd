import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "~/server/services/parsers/map/strategies/interfaces/MapParserStrategy"
import type MapData from "./interfaces/MapData"
import type { MapFormat } from "./interfaces/MapData"

export class LumpMapParser implements MapParserStrategy {
    format: MapFormat = "Lump"
    mapData: MapData
    constructor(mapData: MapData) {
        this.mapData = mapData
    }

    parseMap() {
        //TODO: read the map data and store parsed map info
        return new ParsedMap(this.mapData.name, this.format)
    }
}
