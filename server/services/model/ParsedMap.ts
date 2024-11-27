import type { MapFormat } from "../parsers/map/strategies/interfaces/MapData"

export interface SummaryCount {
    [key: string]: number
}

export default class ParsedMap {
    doomednumCounts: SummaryCount = {}
    textureCounts: SummaryCount = {}
    constructor(
        public name: string,
        public format: MapFormat
    ) {}
}
