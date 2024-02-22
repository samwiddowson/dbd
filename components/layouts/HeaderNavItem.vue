<script setup lang="ts">
import { cn } from "../../utils/cn"
</script>

<template>
    <li class="block w-full text-right sm:inline-block sm:w-32 sm:text-center">
          <RouterLink
            :class="
                cn(
                    `rounded-lg border-black/0 px-2 py-1 text-base text-black
                     hover:font-bold active:font-bold sm:text-xl`,
                    // { 'font-semibold': false },
                    // $attrs.class,
                )
            "
            :to="$attrs.to"
        >
            <slot></slot>
        </RouterLink>
    </li>
</template>
