<script lang="ts" setup>
    interface Product {
        id: number;
        title: string;
        image: string;
        price: number;
        category: string;
    }

    const dataLoading = ref<boolean>(false);
    const storeProducts = ref<Product[]>([]);
    const selectedCategory = ref<string[]>([]);
    const storeCategories = computed(() => {
        const categoryMap = storeProducts.value.reduce((acc, product: Product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(categoryMap)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => a.category.localeCompare(b.category));
    });
    const visibleProducts = computed(() => selectedCategory.value.length === 0 ? storeProducts.value : storeProducts.value.filter((product: Product) => selectedCategory.value.includes(product.category)));

    const filterCategory = (category: string) => {
        if(selectedCategory.value.includes(category)){
            const index = selectedCategory.value.indexOf(category);
            selectedCategory.value.splice(index, 1);
            return;
        }
        selectedCategory.value.push(category);
    }

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
            console.error(`Fetch failed: ${(error as Error).message}`);
        }
    }
    getProducts();
</script>

<template>
    <Title>Products</Title>
    <div class="flex">
        <aside class="w-1/5 border-r border-gray-200">
            <div class="flex flex-col sticky top-20">
                <div class="box-content py-5 px-2 flex justify-between items-center h-10">
                    <h2 class="text-lg font-extrabold">Filter</h2>
                    <button v-if="selectedCategory.length !== 0" class="px-2 h-full bg-red-500 hover:bg-red-400" @click="selectedCategory = []">Clear</button>
                </div>
                <div class="categories p-2 flex flex-col gap-2">
                    <button v-for="item in storeCategories" class="px-4 flex justify-between items-center h-10 capitalize bg-gray-100 hover:bg-gray-50" :class="{ 'bg-yellow-400 hover:bg-yellow-300': selectedCategory.includes(item.category)  }" @click="filterCategory(item.category)">
                        <div>{{ item.category }}</div>
                        <div>{{ item.count }}</div>
                    </button>
                </div>
            </div>
        </aside>
        <section class="w-4/5 grid grid-cols-4">
            <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
        </section>
    </div>
</template>