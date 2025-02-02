<template>
    <div class="rounded-lg p-4 flex flex-col gap-4 bg-white">
        <div class="flex justify-center items-center h-40">
            <img class="max-h-full" :src="product.image" :alt="product.title" />
        </div>
        <div class="grow text-xs">{{ product.title }}</div>
        <div v-if="isAddedToBag" class="flex items-center gap-2">
            <button class="bg-gray-100 hover:bg-gray-50" aria-label="Decrease quantity for the product in cart" @click="cartStore.decreaseQuantity(product.id)"><span class="material-symbols-outlined">remove</span></button>
            <input v-model="quantityInBag" class="rounded-lg border-2 border-yellow-400 flex justify-center items-center w-full h-full text-center font-bold" maxlength="2"/>
            <button class="bg-gray-100 hover:bg-gray-50" aria-label="Increase quantity for the product in cart" @click="cartStore.increaseQuantity(product.id)"><span class="material-symbols-outlined">add</span></button>
            <button class="bg-red-500 hover:bg-red-400" aria-label="Remove product from the cart" @click="cartStore.removeItem(product.id)"><span class="material-symbols-outlined">delete</span></button>
        </div>
        <div v-else>
            <button class="bg-yellow-400 hover:bg-yellow-300" :class="{ 'disabled': !userStore.isLoggedIn }" aria-label="Add product to the cart" @click="cartStore.addItem(product)">Add to bag</button>
        </div>
    </div>
</template>

<script setup>
    const userStore = useUserStore();
    const cartStore = useCartStore();

    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const isAddedToBag = computed(() => cartStore.isAdded(props.product.id));

    const quantityInBag = computed({
        get: () => cartStore.quantity(props.product.id),
        set: (newQuantity) => {
            const parsedQuantity = Number(newQuantity);
            if(Number.isNaN(parsedQuantity) || parsedQuantity < 1 || !Number.isInteger(parsedQuantity)){
                quantityInBag.value = 1; // [BUG] Not working after two fails in a row
                return;
            }
            cartStore.updateQuantity(props.product.id, parsedQuantity);
        }
    });
</script>

<style scoped>
    @import "tailwindcss";

    button {
        @apply flex items-center justify-center w-full h-10;
    }

    button.disabled {
        @apply opacity-50 pointer-events-none;
    }
</style>