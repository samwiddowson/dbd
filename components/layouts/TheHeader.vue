<template>
    <header
        class="fixed left-0 top-0 z-20 w-full bg-gradient-to-l from-amber-400 py-2"
    >
        <nav class="h-full pr-8 sm:pr-4">
            <ul
                class="w-full list-none text-right text-lg font-bold text-black sm:space-x-4 sm:text-2xl"
            >
                <HeaderNavItem to="/"> Home </HeaderNavItem>
                <HeaderNavItem to="/resources"> Resources </HeaderNavItem>
                <HeaderNavItem to="/about"> About </HeaderNavItem>
            </ul>
        </nav>
    </header>
</template>
