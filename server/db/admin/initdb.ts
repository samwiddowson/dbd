import sql from "better-sqlite3"

export function runInitialisationScript() {
    log.trace("called runInitialisationScript")

    log.debug("Init/find database image")

    const db = sql("resources.db")

    log.debug("Dropping tables")

    db.prepare(`DROP TABLE IF EXISTS creators`).run()
    db.prepare(`DROP TABLE IF EXISTS resources`).run()

    log.debug("Creating tables")
    db.prepare(
        `
            CREATE TABLE IF NOT EXISTS resources (
                id TEXT NOT NULL PRIMARY KEY,
                slug TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                file TEXT NOT NULL,
                creator_id TEXT
            )
            `
    ).run()

    db.prepare(
        `
            CREATE TABLE IF NOT EXISTS creators (
                id TEXT NOT NULL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                image TEXT,
                description TEXT
            )
            `
    ).run()
}
