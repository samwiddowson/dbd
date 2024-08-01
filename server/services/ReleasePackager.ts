import ResourceComparator from "~/server/services/comparator/ResourceComparator"
import WadReader from "./parsers/wad/WadReader"
import type ParsedMap from "./model/ParsedMap"
import MapParser from "./parsers/map/MapParser"

export default class ReleasePackager {
    resourceComparator: ResourceComparator
    wadParser: WadReader

    constructor(wadData: Buffer, resourceIndex: string[]) {
        this.resourceComparator = new ResourceComparator()
        this.wadParser = new WadReader(wadData)
    }

    #indexResourceUsage() {
        const mapData = this.wadParser.getMapData()

        const parsedMaps: ParsedMap[] = []

        for (const map of mapData) {
            const mapParser = new MapParser(map)
            parsedMaps.push(mapParser.parseMap())
        }

        for (const map of parsedMaps) {
            this.resourceComparator.addMap(map)
        }
    }

    #indexWadResources() {
        //TODO: look for resources included in the provided WAD
        //  and add them to ResourceComparator (as already included resources)
    }

    #getAdditionalResourceIndexes() {
        //TODO: get used resource pack data from main db using resource index
        //TODO: store resource pack data in ResourceComparator
    }

    #buildRequiredResourceIndex() {
        //TODO: ask resoucecomparator which resources are actually used -- get a list of what is actually required
    }

    #packageRelease() {
        //TODO: essentially make a new resource file
        //  WAD or PK3 as specified
        //INCLUDE:
        //* maps
        //  * individual WADs in a pk3 or the lumps separately
        //* resource data
        //
        return Buffer.from("")
    }

    BuildReleasePackage() {
        this.#indexResourceUsage()

        this.#indexWadResources()

        this.#getAdditionalResourceIndexes()

        this.#buildRequiredResourceIndex()

        return this.#packageRelease()
    }
}
