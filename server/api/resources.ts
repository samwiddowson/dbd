import { getResources } from "../resources/resource-service"

export default defineEventHandler(() => {
    return getResources()
})
