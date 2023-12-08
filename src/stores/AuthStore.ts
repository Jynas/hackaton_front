import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('auth', () => {
    const stateModalSignIn = ref<boolean>(false);
    const stateModalSignUp = ref<boolean>(false);

    return {
        stateModalSignIn,
        stateModalSignUp,
    }
})
