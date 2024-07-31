import type { SummaryCount } from "~/server/services/model/ParsedMap"
import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "~/server/services/parsers/map/strategies/interfaces/MapParserStrategy"
import type MapData from "./interfaces/MapData"
import type { MapFormat, MapLumps } from "./interfaces/MapData"
import readWadLumpText from "../../wad/readWadLumpText"

function getTextureCounts(sidedefsLump: Buffer, sectorsLump: Buffer) {
    const textures: SummaryCount = {}

    function countTexture(texName: string) {
        if (texName !== "-" && texName !== "")
            textures[texName] = textures[texName] ? textures[texName] + 1 : 1
    }

    for (
        let sidedefOffset = 0;
        sidedefOffset < sidedefsLump.length;
        sidedefOffset += 30
    ) {
        const upperTex = readWadLumpText(sidedefsLump, sidedefOffset + 4)
        const lowerTex = readWadLumpText(sidedefsLump, sidedefOffset + 12)
        const middleTex = readWadLumpText(sidedefsLump, sidedefOffset + 20)
        countTexture(upperTex)
        countTexture(middleTex)
        countTexture(lowerTex)
    }

    for (
        let sectorOffset = 0;
        sectorOffset < sectorsLump.length;
        sectorOffset += 26
    ) {
        const floorTex = readWadLumpText(sectorsLump, sectorOffset + 4)
        const ceilTex = readWadLumpText(sectorsLump, sectorOffset + 12)
        countTexture(floorTex)
        countTexture(ceilTex)
    }

    return textures
}

function getThingCounts(thingsLump: Buffer) {
    const things: SummaryCount = {}

    for (
        let thingOffset = 0;
        thingOffset < thingsLump.length;
        thingOffset += 10
    ) {
        const doomedNum = thingsLump.readInt16LE(thingOffset + 6).toString()
        things[doomedNum] = things[doomedNum] ? things[doomedNum] + 1 : 1
    }

    return things
}

export class BinaryMapParser implements MapParserStrategy {
    format: MapFormat = "Lump"
    mapData: MapData
    constructor(mapData: MapData) {
        this.mapData = mapData
    }

    parseMap() {
        const parsedMap = new ParsedMap(this.mapData.name, this.format)
        const mapLumps = this.mapData.data as MapLumps
        parsedMap.textureCounts = getTextureCounts(
            mapLumps.sidedefs,
            mapLumps.sectors
        )
        parsedMap.doomednumCounts = getThingCounts(mapLumps.things)
        return parsedMap
    }
}
