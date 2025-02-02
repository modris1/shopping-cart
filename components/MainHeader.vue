<template>
    <header>
        <div class="flex justify-between border-b border-gray-200 h-[80px]">
            <h1 class="px-5 flex items-center text-2xl">Shopping</h1>
            <div class="border-l border-gray-200 flex justify-center items-center relative w-[80px]">
                <button>
                    <div v-if="isCartEmpty" class="rounded-full flex justify-center items-center absolute top-2 right-2 w-[20px] h-[20px] text-xs font-bold bg-yellow-400">{{ cartStore.totalCount }}</div>
                    <span class="material-symbols-outlined">shopping_cart</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
const isCartEmpty = computed(() => cartStore.totalCount !== 0);
const cartStore = useCartStore();
</script>