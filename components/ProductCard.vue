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

    const isAddedToBag = computed(() => cartStore.isAdded(props.product.id));

    const setValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = Number(target.value);
        if(Number.isNaN(value) || value < 1 || !Number.isInteger(value)){
            cartStore.updateQuantity(props.product.id, 1);
            target.value = "1";
            return;
        }
        cartStore.updateQuantity(props.product.id, value);
    }
</script>

<template>
    <div class="rounded-lg p-4 flex flex-col gap-4 bg-white">
        <div class="flex justify-center items-center h-40">
            <img class="max-h-full" :src="product.image" :alt="product.title" />
        </div>
        <div class="grow text-xs">{{ product.title }}</div>
        <div v-if="isAddedToBag" class="flex items-center gap-2">
            <button class="flex items-center justify-center w-full h-10 bg-gray-100 hover:bg-gray-50" aria-label="Decrease quantity for the product in cart" @click="cartStore.decreaseQuantity(product.id)"><span class="material-symbols-outlined">remove</span></button>
            <input :value="cartStore.quantity(product.id)" @input="setValue" class="rounded-lg border-2 border-yellow-400 flex justify-center items-center w-full h-full text-center font-bold" maxlength="2"/>
            <button class="flex items-center justify-center w-full h-10 bg-gray-100 hover:bg-gray-50" aria-label="Increase quantity for the product in cart" @click="cartStore.increaseQuantity(product.id)"><span class="material-symbols-outlined">add</span></button>
            <button class="flex items-center justify-center w-full h-10 bg-red-500 hover:bg-red-400" aria-label="Remove product from the cart" @click="cartStore.removeItem(product.id)"><span class="material-symbols-outlined">delete</span></button>
        </div>
        <div v-else>
            <button class="flex items-center justify-center w-full h-10 bg-yellow-400 hover:bg-yellow-300" :class="{ 'opacity-50 pointer-events-none': !userStore.isLoggedIn }" aria-label="Add product to the cart" @click="cartStore.addItem(product)">Add to bag</button>
        </div>
    </div>
</template>