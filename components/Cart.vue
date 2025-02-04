<script lang="ts" setup>
    const cartStore = useCartStore();
</script>

<template>
    <div class="py-5 flex flex-col gap-5 fixed w-full h-full bg-white z-10" :class="{ 'hidden': !cartStore.showCart }">
        <button class="flex justify-center items-center absolute top-0 right-0 w-20 h-20 hover:text-red-500" aria-label="Close cart" @click="cartStore.showCart = !cartStore.showCart"><span class="material-symbols-outlined">close</span></button>
        <h1 class="flex justify-center items-center h-10 text-2xl font-bold">Cart</h1>
        <div class="px-5 flex flex-col gap-5">
            <p v-if="cartStore.isEmpty" class="flex justify-center items-center h-20 text-lg italic">Cart is empty!</p>
            <div v-else v-for="item in cartStore.items" :key="item.product.id" class="rounded-lg border border-gray-200 p-4 flex justify-between gap-4 bg-white">
                <div class="flex flex-col gap-5">
                    <div class="flex justify-start items-center h-20">
                        <img class="max-h-full" :src="item.product.image" :alt="item.product.title" />
                    </div>
                    <div class="flex items-center text-xs h-5">{{ item.product.title }}</div>
                </div>
                <div class="flex flex-col gap-5 w-40">
                    <div class="flex gap-5 h-[50%]">
                        <button class="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-50" aria-label="Decrease quantity for the product in cart" @click="cartStore.decreaseQuantity(item.product.id)"><span class="material-symbols-outlined">remove</span></button>
                        <div class="rounded-lg border-2 border-yellow-400 flex justify-center items-center w-full h-full font-bold">{{ item.quantity }}</div>
                        <button class="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-50" aria-label="Increase quantity for the product in cart" @click="cartStore.increaseQuantity(item.product.id)"><span class="material-symbols-outlined">add</span></button>
                    </div>
                    <div class="h-[50%]">
                        <button class="flex items-center justify-center w-full h-full bg-red-500 hover:bg-red-400" aria-label="Remove product from the cart" @click="cartStore.removeItem(item.product.id)"><span class="material-symbols-outlined">delete</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-5 flex flex-col items-end gap-5">
            <div>Items: {{ cartStore.totalCount }}</div>
            <div>Total: ${{ cartStore.totalPrice }}</div>
        </div>
        <div v-if="!cartStore.isEmpty" class="px-5 flex justify-end gap-5">
            <button class="w-40 h-10 bg-red-500 hover:bg-red-400" aria-label="Empty cart" @click="cartStore.empty()">Empty cart</button>
            <button class="w-40 h-10 bg-green-500 hover:bg-green-400" aria-label="Proceed to checkout">Proceed</button>
        </div>
    </div>
</template>