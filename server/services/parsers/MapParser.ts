import type ParsedMap from "../model/ParsedMap"
import type MapParserStrategy from "./interfaces/MapParserStrategy"
import { LumpMapParser } from "./map/strategies/LumpMapParser"
import { UdmfMapParser } from "./map/strategies/UdmfMapParser"
import type {
    LumpMapData,
    UdmfMapData,
} from "./map/strategies/interfaces/MapData"

function determineStrategy(mapData: Buffer | string[]) {
    if (mapData instanceof Buffer) {
        return new LumpMapParser(mapData)
    } else if (Array.isArray(mapData)) {
        return new UdmfMapParser(mapData)
    }
    throw new Error("TODO: message")
}

export default class MapParser {
    mapData: UdmfMapData | LumpMapData
    strategy: MapParserStrategy
    parseMap: () => ParsedMap

    constructor(mapData: Buffer | string[]) {
        this.mapData = mapData
        this.strategy = determineStrategy(mapData)

        this.parseMap = this.strategy.parseMap
    }
}
