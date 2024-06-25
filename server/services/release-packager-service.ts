import ResourceComparator from "~/server/services/comparator/ResourceComparator"
import WadParser from "./parsers/wad/WadParser"
import type ParsedMap from "./model/ParsedMap"
import MapParser from "./parsers/map/MapParser"

export function wrangleResources(wadData: Buffer, resourceIndex: string[]) {
    const resourceComparator = new ResourceComparator()

    const wadParser = new WadParser(wadData)

    const mapData = wadParser.getMapData()

    const parsedMaps: ParsedMap[] = []

    for (const map of mapData) {
        const mapParser = new MapParser(map)
        parsedMaps.push(mapParser.parseMap())
    }

    for (const map of parsedMaps) {
        resourceComparator.addMap(map)
    }

    //TODO: also look for resources included in the provided WAD
    //  and add them to ResourceComparator (with "included" flag?)

    //TODO: get used resource pack data from main db using resource index
    //TODO: store resource pack data in ResourceComparator
    //TODO: ask resoucecomparator which resources are actually used -- get a list of what is actually required
    //TODO: build *only* required resources into a single file
}
