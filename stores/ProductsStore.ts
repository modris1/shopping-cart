import { defineStore } from "pinia";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
}

export const useProductsStore = defineStore("productsStore", () => {
    // State
    const previouslyViewed = ref<Product[]>([]);

    // Actions
    const historyAdd = (product: Product) => {
        const item = previouslyViewed.value.find(item => item.id === product.id);
        if(item) return;
        previouslyViewed.value.unshift(product);
    }

    return {
        previouslyViewed,
        historyAdd
    };
});