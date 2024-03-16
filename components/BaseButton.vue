<template>
    <button
        :class="
            cn(
                'w-content rounded border-2 border-amber-400 bg-amber-400 p-1 text-lg font-semibold text-black',
                'hover:bg-amber-400/80',
                'active:bg-amber-400/80'
            )
        "
    >
        <slot></slot>
    </button>
</template>
