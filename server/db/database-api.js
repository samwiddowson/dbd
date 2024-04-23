import sql from "better-sqlite3"
import { v4 as uuidv4 } from "uuid"

const db = sql("resources.db")

export function saveResourceInfo(info) {
    console.log("saveResourceInfo called with ResourceInfo:", info)
    console.log("RUNNING INSERT")

    const data = {
        id: uuidv4(),
        ...info,
    }

    try {
        db.prepare(
            `
        INSERT INTO resources (id, slug, title, description, image, file)
        VALUES (
            @id, @slug, @name, @description, @image, @dataFile
            )
            `
        ).run(data)
    } catch (err) {
        console.log(
            "An error was encountered while trying to INSERT into the database:",
            err
        )
    }
    console.log("COMPLETED INSERT")
}

export function getAllResources() {
    try {
        const data = db
            .prepare(
                `
                SELECT *
                FROM resources
            `
            )
            .all()
        return data
    } catch (err) {
        console.log(
            "An error was encountered while trying to SELECT all resources from the database:",
            err
        )
    }
}
