<script lang="ts" setup>
    const userStore = useUserStore();
    const cartStore = useCartStore();

    interface Product {
        id: number;
        title: string;
        image: string;
        price: number;
        category: string;
    }

    const props = defineProps<{ product: Product }>();
</script>

<template>
    <div class="rounded-lg p-4 flex flex-col gap-4 bg-white">
        <div class="flex justify-center items-center h-40">
            <img class="max-h-full" :src="product.image" :alt="product.title" />
        </div>
        <div class="grow text-xs">{{ product.title }}</div>
        <div v-if="cartStore.isAdded(product.id)" class="flex items-center gap-2">
            <QuantitySelector class="w-2/3" :id="product.id"/>
            <button class="flex items-center justify-center w-1/3 h-10 bg-red-500 hover:bg-red-400" aria-label="Remove product from the cart" @click="cartStore.removeItem(product.id)"><span class="material-symbols-outlined">delete</span></button>
        </div>
        <div v-else>
            <button class="flex items-center justify-center w-full h-10 bg-yellow-400 hover:bg-yellow-300" :class="{ 'opacity-50 pointer-events-none': !userStore.isLoggedIn }" aria-label="Add product to the cart" @click="cartStore.addItem(product)">Add to bag</button>
        </div>
    </div>
</template>