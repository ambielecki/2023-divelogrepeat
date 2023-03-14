import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const access_token = ref('');
    const is_logged_in = ref(false);

    return { user, access_token, is_logged_in };
});