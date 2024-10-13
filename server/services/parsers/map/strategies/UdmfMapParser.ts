import log from "~/server/utils/log"
import ParsedMap from "~/server/services/model/ParsedMap"
import type MapParserStrategy from "~/server/services/parsers/map/strategies/interfaces/MapParserStrategy"
import type MapData from "./interfaces/MapData"
import type { MapFormat } from "./interfaces/MapData"
import type { SummaryCount } from "~/server/services/model/ParsedMap"
import { Parser } from "simple-text-parser"

const sidedefParser = new Parser()
sidedefParser
    .addRule(/texturebottom = "([\S]{1,8})"\s*;/gi, function (_, textureName) {
        return { type: "texture", name: textureName }
    })
    .addRule(
        /texturemiddle\s=\s"([\S]{1,8})"\s*;/gi,
        function (_, textureName) {
            return { type: "texture", name: textureName }
        }
    )
    .addRule(/texturetop\s=\s"([\S]{1,8})"\s*;/gi, function (_, textureName) {
        return { type: "texture", name: textureName }
    })

const sectorParser = new Parser()
sectorParser
    .addRule(/texturefloor\s=\s"([\S]{1,8})"\s*;/gi, function (_, textureName) {
        return { type: "texture", name: textureName }
    })
    .addRule(
        /textureceiling\s=\s"([\S]{1,8})"\s*;/gi,
        function (_, textureName) {
            return { type: "texture", name: textureName }
        }
    )

const thingParser = new Parser()
thingParser.addRule(/type\s=\s([0-9]+);/, function (_, doomednum) {
    return { type: "thingtype", doomednum: doomednum }
})

const parser = new Parser()

parser
    .addRule(/sidedef[\n\s]*{([^}]*)}/gi, function (_declaration, body) {
        const parsedBody = sidedefParser.toTree(body)
        const textures = parsedBody
            .filter((x) => x.type == "texture")
            .map((x) => x.name)
        return {
            type: "sidedef",
            textures: textures,
        }
    })
    .addRule(/sector[\n\s]*{([^}]*)}/gi, function (_declaration, body) {
        const parsedBody = sectorParser.toTree(body)
        const textures = parsedBody
            .filter((x) => x.type == "texture")
            .map((x) => x.name)
        return {
            type: "sector",
            textures: textures,
        }
    })
    .addRule(/thing[\n\s]*{([^}]*)}/gi, function (_declaration, body) {
        const parsedBody = thingParser.toTree(body)
        const thingTypeNode = parsedBody
            .filter((x) => x.type == "thingtype")
            .pop()
        if (!thingTypeNode) {
            throw new Error("No doomednum found for thing")
        }
        return { type: "thing", doomednum: thingTypeNode.doomednum }
    })

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

        let textmapData = this.mapData.data as string
        textmapData = textmapData.replace(/\/\/.*/g, "")

        const parsedMapTree = parser.toTree(textmapData)

        const textureList = parsedMapTree
            .filter((x) => x.type == "sector" || x.type == "sidedef")
            .map((x) => x.textures as string[])
            .flat()

        if (textureList) {
            for (const textureName of textureList) {
                textureCounts[textureName] =
                    (textureCounts[textureName] || 0) + 1
            }
        }

        const doomednumCounts: SummaryCount = {}

        const doomednums = parsedMapTree
            .filter((x) => x.type == "thing")
            .map((x) => x.doomednum as string)
            .flat()

        if (doomednums) {
            for (const doomednum of doomednums) {
                doomednumCounts[doomednum] =
                    (doomednumCounts[doomednum] || 0) + 1
            }
        }

        parsedMap.textureCounts = textureCounts
        parsedMap.doomednumCounts = doomednumCounts
        return parsedMap
    }
}
