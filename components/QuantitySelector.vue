<script lang="ts" setup>
    const cartStore = useCartStore();

    const props = defineProps<{ id: number }>();

    const setValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = Number(target.value);
        if(Number.isNaN(value) || value < 1 || !Number.isInteger(value)){
            cartStore.updateQuantity(props.id, 1);
            target.value = "1";
            return;
        }
        cartStore.updateQuantity(props.id, value);
        target.value = value.toString();
    }
</script>

<template>
    <div class="flex gap-2 h-full">
        <button class="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-50" aria-label="Decrease quantity for the product in cart" @click="cartStore.decreaseQuantity(id)"><span class="material-symbols-outlined">remove</span></button>
        <input :value="cartStore.quantity(id)" @input="setValue" class="rounded-lg border-2 border-yellow-400 flex justify-center items-center w-full text-center font-bold" maxlength="2"/>
        <button class="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-50" aria-label="Increase quantity for the product in cart" @click="cartStore.increaseQuantity(id)"><span class="material-symbols-outlined">add</span></button>
    </div>
</template>