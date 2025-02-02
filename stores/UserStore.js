import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        loggedIn: false
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.loggedIn;
        }
    },
    actions: {
        logIn() {
            this.loggedIn = true;
        },
        logOut() {
            this.loggedIn = false;
        }
    }
});