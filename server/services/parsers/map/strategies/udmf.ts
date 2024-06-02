import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "../../interfaces/MapParserStrategy"

export class UDMF implements MapParserStrategy {
    parseMap() {
        return new ParsedMap()
    }
}
