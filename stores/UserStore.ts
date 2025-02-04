import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
    // State
    const loggedIn = ref<boolean>(false);

    // Getters
    const isLoggedIn = computed(() => loggedIn.value);

    // Actions
    const logIn = () => loggedIn.value = true;
    const logOut = () => loggedIn.value = false;

    return {
        loggedIn,
        isLoggedIn,
        logIn,
        logOut
    };
});