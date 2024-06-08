import type ParsedMap from "~/server/services/model/ParsedMap"
import { LumpMapParser } from "~/server/services/parsers/map/strategies/LumpMapParser"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"
import type {
    LumpMapData,
    UdmfMapData,
} from "./map/strategies/interfaces/MapData"

function determineStrategy(mapData: Buffer | string[]) {
    if (mapData instanceof Buffer) {
        return new LumpMapParser(mapData)
    } else {
        return new UdmfMapParser(mapData)
    }
}

export default class MapParser {
    mapData: UdmfMapData | LumpMapData
    strategy: LumpMapParser | UdmfMapParser
    parseMap: () => ParsedMap

    constructor(mapData: Buffer | string[]) {
        this.mapData = mapData
        this.strategy = determineStrategy(mapData)

        this.parseMap = this.strategy.parseMap
    }
}
