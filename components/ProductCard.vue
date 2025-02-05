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
    <div class="group/product rounded-lg border border-gray-100 p-4 flex flex-col gap-4 hover:border-emerald-500">
        <div class="flex justify-center h-40">
            <NuxtLink :to="`/products/${product.id}`" class="group/preview flex items-center relative h-40">
                <img class="max-h-full group-hover/preview:opacity-50" :src="product.image" :alt="product.title" />
                <span class="material-symbols-outlined justify-center items-center absolute inset-0 !hidden group-hover/preview:!flex">visibility</span>
            </NuxtLink>
        </div>
        <NuxtLink :to="`/products/${product.id}`" class="grow font-medium text-sm text-blue-600">{{ product.title }}</NuxtLink>
        <div v-if="cartStore.isAdded(product.id)" class="flex items-center gap-2">
            <QuantitySelector class="w-2/3" :id="product.id"/>
            <button class="flex justify-center items-center w-1/3 h-10 bg-red-500 hover:bg-red-400"
                    aria-label="Remove product from the cart"
                    @click="cartStore.removeItem(product.id)">
                <span class="material-symbols-outlined">remove_shopping_cart</span>
            </button>
        </div>
        <div v-else>
            <button class="flex justify-center items-center gap-2.5 w-full h-10 bg-gray-100"
                    :class="{ 'group-hover/product:bg-emerald-500 hover:bg-emerald-400': userStore.loggedIn, 'opacity-50 pointer-events-none': !userStore.loggedIn }"
                    aria-label="Add product to the cart"
                    @click="cartStore.addItem(product)">
                <span class="material-symbols-outlined">add_shopping_cart</span>
                <span>Add to cart</span>
            </button>
        </div>
    </div>
</template>