<script lang="ts" setup>
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const isCartEmpty = computed(() => cartStore.totalCount === 0);
</script>

<template>
    <header class="sticky top-0 bg-white z-10">
        <div class="flex justify-between border-b border-gray-200 h-[80px]">
            <h1 class="px-5 flex items-center text-2xl">Shopping</h1>
            <div class="flex">
                <div v-if="userStore.isLoggedIn" class="border-l border-gray-200 flex justify-center items-center relative w-[80px]">
                    <button class="hover:text-yellow-400" @click="cartStore.showCart = !cartStore.showCart">
                        <div v-if="!isCartEmpty" class="rounded-full flex justify-center items-center absolute top-2 right-2 w-[20px] h-[20px] text-xs font-bold text-black bg-yellow-400">{{ cartStore.totalCount }}</div>
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
                <div v-if="userStore.isLoggedIn" class="border-l border-gray-200 flex justify-center items-center w-[80px]">
                    <button class="hover:text-red-500" @click="userStore.logOut()"><span class="material-symbols-outlined">logout</span></button>
                </div>
                <div v-else class="border-l border-gray-200 px-5 flex justify-center items-center">
                    <button class="hover:text-green-500" @click="userStore.logIn()"><span class="material-symbols-outlined">person</span></button>
                </div>
            </div>
        </div>
    </header>
</template>