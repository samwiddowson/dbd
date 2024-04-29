import sql from "better-sqlite3"
import log from "~/server/utils/log.js"
import { v4 as uuidv4 } from "uuid"

const db = sql("resources.db")

export function saveResourceInfo(info) {
    log.trace("saveResourceInfo called with ResourceInfo:", info)
    log.info("RUNNING INSERT")

    const data = {
        id: uuidv4(),
        ...info,
    }

    try {
        db.prepare(
            `
        INSERT INTO resources (
            id,
            slug,
            title,
            description,
            image,
            file,
            creator_id
        )
        VALUES (
            @id, @slug, @name, @description, @image, @dataFile, @creatorId
            )
            `
        ).run(data)
    } catch (err) {
        log.error(
            "An error was encountered while trying to INSERT into the database:",
            err
        )
    }
    log.info("COMPLETED INSERT")

    return data.id
}

export function getAllResources() {
    try {
        const data = db
            .prepare(
                `
                SELECT r.id resource_id
                     , r.slug resource_slug
                     , r.title resource_title
                     , r.description resource_description
                     , r.image resource_image
                     , r.file resource_file
                     , c.slug creator_slug
                     , c.name creator_name
                     , c.image creator_image
                     , c.description creator_description
                FROM resources r
                     LEFT JOIN creators c ON c.id = r.creator_id
            `
            )
            .all()
        return data
    } catch (err) {
        log.error(
            "An error was encountered while trying to SELECT all resources from the database:",
            err
        )
    }
}

export function saveCreatorInfo(info) {
    const data = {
        id: uuidv4(),
        ...info,
    }

    try {
        db.prepare(
            `
                INSERT INTO creators (id, slug, name, image, description)
                VALUES (@id, @slug, @name, @image, @description)
            `
        ).run(data)
    } catch (err) {
        console.log(
            "An error was encountered trying to INSERT creator info:",
            data,
            "Error was:",
            err
        )
    }
}

export function getAllCreators() {
    try {
        const data = db
            .prepare(
                `
                SELECT * FROM creators
            `
            )
            .all()
        return data
    } catch (err) {
        log.error(
            "An error was encountered while trying to SELECT all creators from the database:",
            err
        )
    }
}
