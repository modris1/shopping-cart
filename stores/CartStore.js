import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
    state: () => ({
        items: [],
        showCart: false
    }),
    getters: {
        isAdded: (state) => (id) => {
            return state.items.some(item => item.product.id === id);
        },
        quantity: (state) => (id) => {
            const item = state.items.find(item => item.product.id === id);
            return item ? item.quantity : 0;
        },
        totalPrice: (state) => {
            return state.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2);
        },
        totalCount: (state) => {
            return state.items.reduce((acc, item) => acc + item.quantity, 0);
        }
    },
    actions: {
        empty() {
            this.items = [];
        },
        addItem(product) {
            this.items.push({ product, quantity: 1 });
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.product.id !== id);
        },
        increaseQuantity(id) {
            const item = this.items.find(item => item.product.id === id);
            if(!item || item.quantity >= 99) return;
            item.quantity ++;
        },
        decreaseQuantity(id) {
            const item = this.items.find(item => item.product.id === id);
            if(!item || item.quantity === 1) return;
            item.quantity --;
        },
        updateQuantity(id, newQuantity){
            const item = this.items.find(item => item.product.id === id);
            item.quantity = newQuantity;
        }
    }
});