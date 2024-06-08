import type ParsedMap from "~/server/services/model/ParsedMap"

export default interface MapParserStrategy {
    format: string
    parseMap: () => ParsedMap
}
