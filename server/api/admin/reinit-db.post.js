import { defineEventHandler, readBody } from "#imports"
import { reinitDatabase } from "~/server/services/admin-service"
import log from "~/server/utils/log"

export default defineEventHandler(async (event) => {
    log.trace("POST admin/reinit-db")
    const body = await readBody(event)

    log.debug("with body", body)
    if (body.confirm === "Do it!") {
        log.info("Valid request to reinitialise database")
        await reinitDatabase()
    } else {
        log.info("Request to reinitialise database was invalid")
    }
})
