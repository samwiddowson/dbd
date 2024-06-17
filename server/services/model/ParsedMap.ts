import type { MapFormat } from "../parsers/map/strategies/interfaces/MapData"

export interface SummaryCount {
    [key: string]: number
}

export default class ParsedMap {
    name: string
    format: MapFormat
    doomednumCounts: SummaryCount = {}
    textureCounts: SummaryCount = {}
    constructor(name: string, format: MapFormat) {
        this.name = name
        this.format = format
    }
    getMapDataAsString() {
        return "NOT IMPLEMENTED"
    }
}
