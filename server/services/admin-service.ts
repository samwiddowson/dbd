import { unlink } from "node:fs/promises"
import { runInitialisationScript } from "~/server/db/admin/initdb"

export async function reinitDatabase() {
    log.trace("called reinitDatabase")

    //Delete the database file
    try {
        await unlink("resources.db")
    } catch (err) {
        log.error("Error attempting to delete database file:", err)
        throw err
    }

    log.info("Successfully removed database image")

    //Run the database initialisation script
    try {
        runInitialisationScript()
    } catch (err) {
        log.error(
            "Error attempting to run database initialisation script:",
            err
        )
    }
    log.info("Successfully run database initialisation script")
}
