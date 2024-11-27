import ResourceComparator from "~/server/services/comparator/ResourceComparator"
import WadReader from "./parsers/wad/WadReader"
import type ParsedMap from "./model/ParsedMap"
import MapParser from "./parsers/map/MapParser"
import ResourceParser from "./parsers/resource/ResourceParser"

export default class ReleasePackager {
    resourceComparator: ResourceComparator
    wadReader: WadReader
    resourceIndexes: string[]

    constructor(wadData: Buffer, resourceIndexes: string[]) {
        this.resourceComparator = new ResourceComparator()
        this.wadReader = new WadReader(wadData)
        this.resourceIndexes = resourceIndexes
    }

    private indexResourceUsage() {
        const mapData = this.wadReader.getMapData()

        const parsedMaps: ParsedMap[] = []

        for (const map of mapData) {
            const mapParser = new MapParser(map)
            parsedMaps.push(mapParser.parseMap())
        }

        for (const map of parsedMaps) {
            this.resourceComparator.addMap(map)
        }
    }

    private indexWadResources() {
        const includedResourceData = this.wadReader.getResourceData()
        console.log(includedResourceData)

        const resourceParser = new ResourceParser(includedResourceData)

        const parsedResourceData = resourceParser.parse()
        this.resourceComparator.addResources(parsedResourceData)
    }

    private getAdditionalResourceIndexes() {
        //TODO: get used resource pack data from main db using resource index
        //TODO: store resource pack data in ResourceComparator
    }

    private buildRequiredResourceIndex() {
        //TODO: ask resourcecomparator which resources are actually used -- get a list of what is actually required
    }

    private packageRelease() {
        //TODO: essentially make a new resource file
        //  WAD or PK3 as specified
        //INCLUDE:
        //* maps
        //  * individual WADs in a pk3 or the lumps separately
        //* resource data
        //
        return Buffer.from("")
    }

    BuildAndTrimReleasePackage() {
        this.indexResourceUsage()

        this.indexWadResources()

        this.getAdditionalResourceIndexes()

        this.buildRequiredResourceIndex()

        return this.packageRelease()
    }
}
