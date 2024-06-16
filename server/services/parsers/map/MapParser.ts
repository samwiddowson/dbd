import type MapData from "./strategies/interfaces/MapData"
import { MapLumps } from "./strategies/interfaces/MapData"

import type ParsedMap from "~/server/services/model/ParsedMap"
import { LumpMapParser } from "~/server/services/parsers/map/strategies/LumpMapParser"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"

function determineStrategy(mapData: MapData) {
    if (mapData.data instanceof MapLumps) {
        return new LumpMapParser(mapData)
    } else {
        return new UdmfMapParser(mapData)
    }
}

export default class MapParser {
    mapData: MapData
    strategy: LumpMapParser | UdmfMapParser
    parseMap: () => ParsedMap

    constructor(mapData: MapData) {
        this.mapData = mapData
        this.strategy = determineStrategy(mapData)

        this.parseMap = this.strategy.parseMap
    }
}
