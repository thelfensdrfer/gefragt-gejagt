<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
.button {
    @apply px-4 py-2 rounded cursor-pointer;
}
.button-primary {
    @apply bg-blue-700 text-white;
}
.button-primary:hover {
    @apply bg-blue-800;
}
.button-secondary {
    @apply bg-gray-200;
}
.button-secondary:hover {
    @apply bg-gray-300;
}

.tab-nav {
    @apply mb-8;
}

.tab-nav li {
    @apply px-4 py-1 mx-2 rounded bg-blue-500 text-white cursor-pointer font-bold uppercase;
}
.tab-nav li:hover {
    @apply bg-blue-700;
}
.tab-nav li:first-child {
    @apply ml-0;
}
.tab-nav li:last-child {
    @apply mr-0;
}

.tab-nav .tab-nav-link-active {
    @apply bg-blue-900;
}

input[type="text"],
input[type="number"] {
    @apply rounded border border-gray-200 px-2 py-1;
}
</style>
