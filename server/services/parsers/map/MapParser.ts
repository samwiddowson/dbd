import type MapData from "./strategies/interfaces/MapData"
import { MapLumps } from "./strategies/interfaces/MapData"

import type ParsedMap from "~/server/services/model/ParsedMap"
import { BinaryMapParser } from "~/server/services/parsers/map/strategies/BinaryMapParser"
import { UdmfMapParser } from "~/server/services/parsers/map/strategies/UdmfMapParser"

export default class MapParser {
    strategy: BinaryMapParser | UdmfMapParser
    parseMap: () => ParsedMap

    private determineStrategy() {
        if (this.mapData.data instanceof MapLumps) {
            return new BinaryMapParser(this.mapData)
        } else {
            return new UdmfMapParser(this.mapData)
        }
    }

    constructor(private mapData: MapData) {
        this.strategy = this.determineStrategy()

        this.parseMap = this.strategy.parseMap
    }
}
