<script lang="ts" setup>
    const userStore = useUserStore();
</script>

<template>
    <MainHeader />
    <Cart v-if="userStore.isLoggedIn"/>
    <main>
        <slot />
    </main>
</template>