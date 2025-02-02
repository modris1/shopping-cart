<template>
    <Title>Products</Title>
    <div class="flex">
        <aside class="w-1/5 border-r border-gray-200 flex flex-col gap-2">
            <div class="py-5 px-2 flex justify-between items-center">
                <h2 class="text-lg font-extrabold">Filter</h2>
                <button v-if="selectedCategory !== 'all'" class="px-2 bg-red-500" @click="selectedCategory = 'all'">Clear</button>
            </div>
            <div class="categories p-2 flex flex-col gap-2">
                <button v-for="category in storeCategories" :class="{ 'selected': category === selectedCategory }" @click="selectedCategory = category">{{ category }}</button>
            </div>
        </aside>
        <section class="w-4/5 grid grid-cols-4">
            <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
        </section>
    </div>
</template>

<script setup>
const dataLoading = ref(false);
const storeProducts = ref([]);
const selectedCategory = ref("all");
const storeCategories = computed(() => {
    return [...new Set(storeProducts.value.map(product => product.category))].sort();
});
const visibleProducts = computed(() => selectedCategory.value === "all" ? storeProducts.value : storeProducts.value.filter(product => product.category === selectedCategory.value));

const getProducts = async (url = "https://fakestoreapi.com/products") => {
    try {
        dataLoading.value = true;
        const response = await fetch(url);
        dataLoading.value = false;
        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`);
        }
        storeProducts.value = await response.json();
    } catch (error) {
        console.error(`Fetch failed: ${error.message}`);
    }
}
getProducts();
</script>

<style scoped>
@import "tailwindcss";

.categories button {
    @apply px-4 flex justify-start items-center h-[40px] capitalize bg-gray-100;
}

.categories button.selected {
    @apply bg-yellow-400;
}
</style>