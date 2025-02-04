import { defineStore } from "pinia";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export const useCartStore = defineStore("cartStore", () => {
    // State
    const showCart = ref<boolean>(false);
    const items = ref<CartItem[]>([]);

    // Getters
    const isAdded = computed(() => (id: number) => items.value.some(item => item.product.id === id));
    const quantity = computed(() => (id: number) => {
        const item = items.value.find(item => item.product.id === id);
        return item ? item.quantity : 0;
    });
    const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2));
    const totalCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0));

    // Actions
    const empty = () => items.value = [];
    const addItem = (product: Product) => items.value.push({ product, quantity: 1 });
    const removeItem = (id: number) => items.value = items.value.filter(item => item.product.id !== id);
    const increaseQuantity = (id: number) => {
        const item = items.value.find(item => item.product.id === id);
        if (!item || item.quantity >= 99) return;
        item.quantity++;
    }
    const decreaseQuantity = (id: number) => {
        const item = items.value.find(item => item.product.id === id);
        if (!item || item.quantity === 1) return;
        item.quantity--;
    }
    const updateQuantity = (id: number, newQuantity: number) => {
        const item = items.value.find(item => item.product.id === id);
        if(!item) return;
        item.quantity = newQuantity;
    }

    return {
        showCart,
        items,
        isAdded,
        quantity,
        totalPrice,
        totalCount,
        empty,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity
    };
});