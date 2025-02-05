<script lang="ts" setup>
    const cartStore = useCartStore();
    const productsStore = useProductsStore();
    const userStore = useUserStore();
    
    const { id } = useRoute().params as { id: string };

    interface Product {
        id: number;
        title: string;
        description: string;
        image: string;
        price: number;
        rating: {
            rate: number,
            count: number
        },
        category: string;
    }

    const { data: product } = await useFetch<Product>(`https://fakestoreapi.com/products/${id}`);
    
    if(product.value){
        productsStore.historyAdd(product.value);
    } else {
        throw new Error("No product found.");
    }
</script>

<template>
    <Title v-if="product">{{ product.title }}</Title>
    <Title v-else>Loading...</Title>
    <div v-if="product" class="p-5 flex gap-10">
        <div class="rounded-lg border border-gray-100 p-5 flex justify-center items-center w-1/2 h-160">
            <img class="max-h-full" :src="product.image" :alt="product.title" />
        </div>
        <div class="flex flex-col justify-between gap-5 w-1/2">
            <div class="flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="flex items-center min-h-10 font-extrabold text-2xl">{{ product.title }}</h1>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="material-symbols-outlined">category</span>
                        <span class="font-light">{{ product.category }}</span>
                    </div>
                    <span class="font-bold text-4xl">${{ product.price.toFixed(2) }}</span>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined">star</span>
                        <span>{{ product.rating.rate }}/5</span>
                        <span>({{ product.rating.count }} reviews)</span>
                    </div>
                </div>
                <div>
                    <h2 class="font-medium">Product desscription:</h2>
                    <p>{{ product.description }}</p>
                </div>
            </div>
            <div v-if="cartStore.isAdded(product.id)" class="flex justify-end gap-5">
                <QuantitySelector v-if="cartStore.isAdded(product.id)" :id="product.id"/>
                <button class="px-5 flex items-center gap-2.5 h-10 bg-red-500 hover:bg-red-400"
                        aria-label="Remove product from the cart"
                        @click="cartStore.removeItem(product.id)">
                    <span class="material-symbols-outlined">remove_shopping_cart</span>
                    <span>Remove from cart</span>
                </button>
            </div>
            <div v-else class="flex justify-end gap-5">
                <button class="px-5 flex items-center gap-2.5 h-10"
                        :class="{ 'bg-emerald-500 hover:bg-emerald-400': userStore.loggedIn, 'bg-gray-100 opacity-50 pointer-events-none': !userStore.loggedIn }"
                        aria-label="Add product to the cart"
                        @click="cartStore.addItem(product)">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                    <span>Add to cart</span>
                </button>
            </div>
        </div>
    </div>
</template>