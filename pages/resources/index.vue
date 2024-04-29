<script setup lang="ts">
const { data, pending, error, _refresh } = await useFetch("/api/resources", {
    lazy: true,
})
</script>

<template>
    <main>
        <div>
            <div class="mb-8 inline-block w-full sm:w-3/4">
                <BaseH1 class="text-left text-lime-200">Resources Page</BaseH1>
            </div>
            <div class="inline-block w-full text-right sm:w-1/4">
                <NuxtLink to="/resources/upload">Upload</NuxtLink>
            </div>
        </div>
        <hr />
        <div class="h-full bg-lime-200/10 px-4 pb-24 pt-8">
            <div v-if="pending">
                <p>Loading...</p>
            </div>
            <ul v-else-if="data?.length > 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <li v-for="resource in data" :key="resource.id">
                    <ResourceCard :name="resource.title" :slug="resource.slug" :img-url="resource.image"
                        :description="resource.description" />
                </li>
            </ul>
            <div v-else>
                <p>No resources to display!</p>
            </div>
            <div class="">{{ data }}{{ pending }}|{{ error }}</div>
        </div>
    </main>
</template>
