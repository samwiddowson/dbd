import sql from "better-sqlite3"
const db = sql("resources.db")

export interface ResourceInfo {
    name: string
    description: string
    image: string
    dataFile: string
}

export function saveResourceInfo(info: ResourceInfo) {
    console.log("saveResourceInfo called with ResourceInfo:", info)
    console.log("RUNNING INSERT")

    console.log(db.prepare("SELECT * from resources").all())
    db.prepare(
        `
        INSERT INTO resources (id, slug, title, image, file)
        VALUES (
            1, 'test-slug', @description, @image, @datafile
            )
            `
    ).run(info)
    console.log("COMPLETED INSERT")
}
