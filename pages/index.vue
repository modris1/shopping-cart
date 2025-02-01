<template>
    <Title>Home</Title>
    <div class="text-4xl text-bold text-center">Shopping cart</div>
</template>

<script setup>
    const cartStore = useCartStore();
    console.log(cartStore.items);
</script>