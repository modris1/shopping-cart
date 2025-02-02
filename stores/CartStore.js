import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
    state: () => ({
        items: []
    }),
    getters: {
        isAdded: (state) => (id) => {
            return state.items.some(item => item.product.id === id);
        },
        totalCount() {
            return this.items.length;
        }
    },
    actions: {
        addItem(product) {
            const items = this.items;
            const existingItem = items.find(item => item.product.id === product.id);
            if(existingItem){
                existingItem.quantity ++;
            } else {
                items.push({ product, quantity: 1 });
            }
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.product.id !== id);
        }
    }
});