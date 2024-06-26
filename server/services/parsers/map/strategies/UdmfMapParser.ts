import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "~/server/services/parsers/map/strategies/interfaces/MapParserStrategy"
import type MapData from "./interfaces/MapData"
import type { MapFormat } from "./interfaces/MapData"
import type { SummaryCount } from "~/server/services/model/ParsedMap"

export class UdmfMapParser implements MapParserStrategy {
    format: MapFormat = "UDMF"
    mapData: MapData

    constructor(mapData: MapData) {
        this.mapData = mapData
    }

    parseMap() {
        const parsedMap = new ParsedMap(this.mapData.name, this.format)
        const textureCounts: SummaryCount = {}

        if (this.mapData.data instanceof Buffer) {
            throw new Error("Unexpected map data type")
        }
        const textmapData = this.mapData.data as string

        //No point in verifying the full structure of the map data
        //We only need to find very specfic patterns
        const textureReferences = textmapData
            .replace(/\s/g, "")
            .match(
                /[;{]texture((middle)|(top)|(bottom)|(floor)|(ceiling))=".{1,8}"/gi
            )
        if (textureReferences) {
            for (const texDeclaration of textureReferences) {
                //do something
                const textureName = texDeclaration.match(
                    /"(?<textureName>.{1,8})"/
                )!.groups!.textureName
                textureCounts[textureName] =
                    (textureCounts[textureName] || 0) + 1
            }
        }

        const doomednumCounts: SummaryCount = {}

        const thingReferences = textmapData
            .replace(/\s/g, "")
            .match(/thing\/\/[0-9]+{[^{]*type=[0-9]+[^}]*}/gi)
        if (thingReferences) {
            for (const thingDeclaration of thingReferences) {
                //do something
                const doomednum = thingDeclaration.match(
                    /type=(?<doomednum>[0-9]+)/
                )!.groups!.doomednum
                doomednumCounts[doomednum] =
                    (doomednumCounts[doomednum] || 0) + 1
            }
        }

        parsedMap.textureCounts = textureCounts
        parsedMap.doomednumCounts = doomednumCounts
        return parsedMap
    }
}
