<template>
    <MainHeader />
    <Cart v-if="userStore.isLoggedIn"/>
    <main>
        <slot />
    </main>
</template>

<script setup>
    const userStore = useUserStore();
</script>