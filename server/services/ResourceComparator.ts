import sql from "better-sqlite3"
import type ParsedMap from "./model/ParsedMap"

export default class ResourceComparator {
    db: sql.Database

    constructor() {
        this.db = sql(":memory:")
    }

    addMap(map: ParsedMap) {
        this.db.prepare("CREATE TABLE @name (texture_name)").run({
            name: `${map.name}_textures`,
        })
        this.db.prepare("CREATE TABLE @name (doomednum)").run({
            name: `${map.name}_things`,
        })

        //TODO: insert map data info into table
    }
}
