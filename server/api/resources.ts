import { resourceService } from "../services"
import log from "~/server/utils/log"

export default defineEventHandler(() => {
    log.trace("GET resources")

    return resourceService.getResources()
})
