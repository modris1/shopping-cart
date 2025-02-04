<script lang="ts" setup>
    interface Product {
        id: number;
        title: string;
        image: string;
        price: number;
        category: string;
    }

    interface Categories {
        category: string;
        count: number;
        selected: boolean;
    }

    const dataLoading = ref<boolean>(false);
    const storeProducts = ref<Product[]>([]);
    const storeCategories = ref<Categories[]>([]);
    const selectedCategories = computed(() => storeCategories.value.filter(item => item.selected));
    const unSelectedCategories = computed(() => storeCategories.value.filter(item => !item.selected));
    const visibleProducts = computed(() => selectedCategories.value.length === 0 ? storeProducts.value : storeProducts.value.filter((product: Product) => selectedCategories.value.find(item => item.category === product.category)));
    
    const resetFilter = () => storeCategories.value.forEach(item => item.selected = false);
    const getProducts = async (url = "https://fakestoreapi.com/products") => {
        try {
            dataLoading.value = true;
            const response = await fetch(url);
            dataLoading.value = false;
            if (!response.ok) {
                console.error(`API error: ${response.status} ${response.statusText}`);
            }
            // Products
            storeProducts.value = await response.json();
            // Categories
            const categoryMap = storeProducts.value.reduce((acc, product: Product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
            storeCategories.value = Object.entries(categoryMap).map(([category, count]) => ({ category, count, selected: false })).sort((a, b) => a.category.localeCompare(b.category));
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
                    <h2 class="text-lg font-extrabold">Filters</h2>
                    <button v-if="selectedCategories.length !== 0" class="px-2 h-full bg-red-500 hover:bg-red-400" @click="resetFilter">Clear</button>
                </div>
                <div class="categories p-2 flex flex-col gap-5">
                    <div v-if="selectedCategories.length !== 0" class="flex flex-col gap-5">
                        <span class="pl-2 font-bold">Selected:</span>
                        <div class="flex flex-col gap-2">
                            <button v-for="item in selectedCategories" class="group px-4 flex justify-between items-center h-10 capitalize" :class="{ 'bg-gray-100 hover:bg-yellow-200': !item.selected, 'bg-yellow-300 hover:bg-red-400': item.selected  }" @click="item.selected = !item.selected">
                                <div>{{ item.category }}</div>
                                <span class="min-w-6" :class="{ 'group-hover:hidden': item.selected }">{{ item.count }}</span>
                                <span v-if="item.selected" class="!hidden group-hover:!inline-block material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                    <div v-if="unSelectedCategories.length !== 0" class="flex flex-col gap-5">
                        <span class="pl-2">Categories:</span>
                        <div class="flex flex-col gap-2">
                            <button v-for="item in unSelectedCategories" class="group px-4 flex justify-between items-center h-10 capitalize" :class="{ 'bg-gray-100 hover:bg-yellow-200': !item.selected, 'bg-yellow-300 hover:bg-red-400': item.selected  }" @click="item.selected = !item.selected">
                                <div>{{ item.category }}</div>
                                <span class="min-w-6" :class="{ 'group-hover:hidden': item.selected }">{{ item.count }}</span>
                                <span v-if="item.selected" class="!hidden group-hover:!inline-block material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <section v-if="dataLoading" class="p-4 w-4/5 grid grid-cols-4 gap-4">
            <div v-for="n in 16" :key="n" class="rounded-lg h-74 bg-gray-100 animate-pulse"></div>
        </section>
        <section v-else class="p-4 w-4/5 grid grid-cols-4 gap-4">
            <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
        </section>
    </div>
</template>