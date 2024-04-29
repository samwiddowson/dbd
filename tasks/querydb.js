import sql from "better-sqlite3"
const db = sql("resources.db")

console.log(db.prepare("SELECT * from creators").all())
console.log(db.prepare("SELECT * from resources").all())
