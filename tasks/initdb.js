// const sql = require("better-sqlite3")

import sql from "better-sqlite3"
const db = sql("resources.db")

db.prepare(`DROP TABLE IF EXISTS resources`)

db.prepare(
    `
CREATE TABLE IF NOT EXISTS resources (
    id TEXT NOT NULL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    file TEXT NOT NULL,
    creator_id TEXT
)
`
).run()

db.prepare(`DROP TABLE IF EXISTS creators`)

db.prepare(
    `
CREATE TABLE IF NOT EXISTS creators (
    id TEXT NOT NULL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
    description TEXT
)
`
).run()
