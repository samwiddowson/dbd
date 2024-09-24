import sql from "better-sqlite3"
import type ParsedMap from "~/server/services/model/ParsedMap"
import type { SummaryCount } from "~/server/services/model/ParsedMap"
import type { ParsedResourceData } from "../parsers/wad/interfaces/ResourceData"

export default class ResourceComparator {
    db: sql.Database

    constructor() {
        this.db = sql(":memory:")
        this.db
            .prepare(
                `CREATE TABLE texture_counts (texture_name, map_name, count)`
            )
            .run()
        this.db
            .prepare(
                `CREATE TABLE doomednum_counts (doomednum, map_name, count)`
            )
            .run()
    }

    addMap(map: ParsedMap) {
        const insertMapData = this.db.transaction(() => {
            const insertSummaryCounts = (
                summaryCounts: SummaryCount,
                tableName: string
            ) => {
                for (const itemName of Object.keys(summaryCounts)) {
                    this.db
                        .prepare(
                            `
                        INSERT INTO ${tableName}
                        (texture_name, map_name, count)
                        VALUES (@textureName, @mapName, @count)
                        `
                        )
                        .run({
                            textureName: itemName,
                            mapName: map.name,
                            count: map.textureCounts[itemName],
                        })
                }
            }
            insertSummaryCounts(map.textureCounts, "texture_counts")
        })

        insertMapData()
    }

    addResources(resourceData: ParsedResourceData) {
        console.log(resourceData)
        //TODO: add each item in resourceData to in-memory db
    }
}
