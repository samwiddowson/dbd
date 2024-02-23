<script setup lang="ts">
import { cn } from "../../utils/cn"
</script>

<template>
    <div
        :class="
            cn(
                'rounded border-2 border-amber-400 bg-black/50 p-2',
                $attrs.class
            )
        "
    >
        <slot></slot>
    </div>
</template>
