import ParsedMap from "../model/ParsedMap"
import type MapParserStrategy from "./interfaces/MapParserStrategy"

export default class MapParser {
    mapData: any
    strategy: MapParserStrategy

    constructor(mapData: any) {
        this.mapData = mapData
        //TODO: decide on which map parsing strategy is required and assign the local strategy here
        this.strategy = {
            parseMap() {
                return new ParsedMap()
            },
        }
    }
}
