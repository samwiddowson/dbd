import type ParsedMap from "../../model/ParsedMap"

export default interface MapParserStrategy {
    format: string
    parseMap: () => ParsedMap
}
