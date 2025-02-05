<script lang="ts" setup>
    const productsStore = useProductsStore();
    const userStore = useUserStore();
</script>

<template>
    <MainHeader />
    <Cart v-if="userStore.loggedIn"/>
    <main>
        <slot />
    </main>
    <section v-if="productsStore.previouslyViewed.length !== 0" class="border-t border-gray-200 py-5">
        <h2 class="px-5 font-medium">Previously viewed:</h2>
        <div class="p-5 flex gap-5 overflow-auto">
            <ProductCard class="shrink-0 w-70" v-for="product in productsStore.previouslyViewed" :key="product.id" :product="product" />
        </div>
    </section>
</template>