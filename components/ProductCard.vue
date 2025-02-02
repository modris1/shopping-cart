<template>
    <div class="rounded-lg p-4 flex flex-col gap-4 bg-white">
        <div class="flex items-center justify-center h-40">
            <img class="max-h-full" :src="product.image" :alt="product.title" />
        </div>
        <div class="grow text-xs">{{ product.title }}</div>
        <button v-if="isAddedToBag" class="bg-red-500" aria-label="Remove product from cart" @click="cartStore.removeItem(product.id)">
            Remove from bag
        </button>
        <button v-else class="bg-yellow-400" aria-label="Add product to cart" @click="cartStore.addItem(product)">
            Add to bag
        </button>
    </div>
</template>

<script setup>
    const cartStore = useCartStore();
    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    });
    const isAddedToBag = computed(() => cartStore.isAdded(props.product.id));
</script>

<style scoped>
@import "tailwindcss";
button {
    @apply flex items-center justify-center h-10;
}
</style>