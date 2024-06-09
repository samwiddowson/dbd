import sql from "better-sqlite3"
import type ParsedMap from "~/server/services/model/ParsedMap"

export default class ResourceComparator {
    db: sql.Database

    constructor() {
        this.db = sql(":memory:")
    }

    addMap(map: ParsedMap) {
        //cannot bind parameters for table name so need to run our own attempt
        //  at injection-safe code
        //essentially, we should throw an error if we see anything non-alphanumeric
        if (map.name !== map.name.replace(/[^A-Za-z0-9_]/, "")) {
            throw new Error(
                `ERROR IN MAP NAME: map has illegal name, ${map.name}`
            )
        }
        const textureTableName = `${map.name}_textures`
        const doomednumTableName = `${map.name}_doomednums`

        this.db
            .prepare(`CREATE TABLE ${textureTableName} (texture_name, count)`)
            .run()
        this.db
            .prepare(`CREATE TABLE ${doomednumTableName} (doomednum, count)`)
            .run()

        for (const textureName of Object.keys(map.textureCounts)) {
            this.db
                .prepare(
                    `
                            INSERT INTO ${textureTableName}
                                        (texture_name, count)
                                 VALUES (@textureName, @count)
                    `
                )
                .run({
                    textureName: textureName,
                    count: map.textureCounts[textureName],
                })
        }
    }
}
