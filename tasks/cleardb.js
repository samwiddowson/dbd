import sql from "better-sqlite3"
const db = sql("resources.db")

console.log(db.prepare("delete from resources").run())
