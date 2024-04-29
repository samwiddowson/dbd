import { getResources } from "../resources/resource-service"
import log from "../utils/log"

export default defineEventHandler(() => {
    log.trace("GET resources")
    return getResources()
})
