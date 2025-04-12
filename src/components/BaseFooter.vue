<template>
    <footer class="bg-light text-center py-3 border-top mt-auto">
        &copy; {{ currentYear }} My Travel App. All rights reserved.
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>