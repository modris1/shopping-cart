import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
    // State
    const loggedIn = ref<boolean>(false);

    // Actions
    const logIn = () => loggedIn.value = true;
    const logOut = () => loggedIn.value = false;

    return {
        loggedIn,
        logIn,
        logOut
    };
});