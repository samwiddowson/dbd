import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "../../interfaces/MapParserStrategy"

export class LumpMapParser implements MapParserStrategy {
    format = "Lump"
    mapData: Buffer
    constructor(mapData: Buffer) {
        this.mapData = mapData
    }

    parseMap() {
        //TODO: read the map data and store parsed map info
        return new ParsedMap("mapName")
    }
}
