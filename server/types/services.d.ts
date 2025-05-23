import type { ResourceService } from "../services/resourceService.ts"

declare module "#app" {
    interface NuxtApp {
        $resourceService: ResourceService
    }
}

declare module "nuxt/schema" {
    interface NuxtApp {
        $resourceService: ResourceService
    }
}

export {}
