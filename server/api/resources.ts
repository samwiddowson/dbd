import { getResources } from "~/server/services/resource-service"
import log from "~/server/utils/log"

export default defineEventHandler(() => {
    log.trace("GET resources")
    return getResources()
})
