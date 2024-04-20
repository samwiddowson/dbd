<script setup lang="ts">
const { data, pending, error, _refresh } = await useFetch("/api/resources")
</script>

<template>
    <main>
        <BaseH1>Resources Page</BaseH1>
        <NuxtLink to="/resources/upload">Upload</NuxtLink>
        <hr />
        <ul v-if="data?.length > 0">
            <li v-for="resource in data" :key="resource.id">
                <ResourceCard
                    :name="resource.title"
                    :slug="resource.slug"
                    :img-url="resource.image"
                />
            </li>
        </ul>
        {{ data }}{{ pending }}|{{ error }}
    </main>
</template>
