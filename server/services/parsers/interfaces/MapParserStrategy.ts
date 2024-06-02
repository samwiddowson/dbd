import type ParsedMap from "./ParsedMap"

export default interface MapParserStrategy {
    parseMap: () => ParsedMap
}
