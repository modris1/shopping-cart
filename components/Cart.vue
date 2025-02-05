<script lang="ts" setup>
    const cartStore = useCartStore();
</script>

<template>
    <div class="fixed top-20 size-full z-10" :class="{ 'hidden': !cartStore.showCart }" @click="cartStore.showCart = !cartStore.showCart">
        <div class="flex flex-col gap-5 max-h-[calc(100%-5rem)] bg-white shadow-2xl overflow-auto overscroll-contain" @click.stop>
            <div class="border-b border-b-gray-200 pl-5 flex justify-start items-center shrink-0 sticky top-0 h-20 bg-white">
                <h1 class="text-2xl font-bold">Cart</h1>
                <button class="flex justify-center items-center absolute top-0 right-0 w-20 h-20 hover:text-red-500"
                        aria-label="Close cart"
                        @click="cartStore.showCart = !cartStore.showCart">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="px-5 flex flex-col gap-5">
                <p v-if="cartStore.isEmpty" class="flex justify-center items-center h-20 text-lg italic">Cart is empty!</p>
                <div v-else v-for="item in cartStore.items" :key="item.product.id" class="rounded-lg border border-gray-200 p-4 flex justify-between gap-4 bg-white">
                    <div class="flex flex-col gap-5">
                        <div class="flex justify-start items-center h-20">
                            <img class="max-h-full" :src="item.product.image" :alt="item.product.title" />
                        </div>
                        <div class="flex items-center text-xs h-5">{{ item.product.title }}</div>
                    </div>
                    <div class="flex flex-col gap-5">
                        <div class="flex gap-5 h-[50%]">
                            <QuantitySelector :id="item.product.id"/>
                        </div>
                        <div class="h-[50%]">
                            <button class="flex justify-center items-center gap-2.5 size-full bg-red-500 hover:bg-red-400"
                                    aria-label="Remove product from the cart"
                                    @click="cartStore.removeItem(item.product.id)">
                                <span class="material-symbols-outlined">remove_shopping_cart</span>
                                <span>Remove from cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t border-t-gray-200 py-5 flex flex-col gap-5">
                <div class="px-5 flex flex-col items-end gap-2">
                    <div>Items: {{ cartStore.totalCount }}</div>
                    <div>Total: ${{ cartStore.totalPrice }}</div>
                </div>
                <div v-if="!cartStore.isEmpty" class="px-5 flex justify-end gap-5">
                    <button class="flex justify-center items-center gap-2.5 w-40 h-10 bg-red-500 hover:bg-red-400"
                            aria-label="Empty cart"
                            @click="cartStore.empty()">
                        <span class="material-symbols-outlined">delete</span>
                        <span>Empty cart</span>
                    </button>
                    <button class="flex justify-center items-center gap-2.5 w-40 h-10 bg-green-500 hover:bg-green-400"
                            aria-label="Proceed to checkout">
                        <span class="material-symbols-outlined">shopping_cart_checkout</span>
                        <span>Proceed</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>