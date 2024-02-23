<script setup lang="ts">
import { cn } from "../../utils/cn"
</script>

<template>
    <li class="block w-full text-right sm:inline-block sm:w-32 sm:text-center">
        <NuxtLink
            :class="
                cn(
                    `border-b-2 border-black/0 px-2 pt-1 text-base text-black
                     transition-all duration-500 hover:font-bold
                     active:font-bold sm:text-xl`
                )
            "
            :to="$attrs.to"
            active-class="border-b-2 border-black"
        >
            <slot></slot>
        </NuxtLink>
    </li>
</template>
