import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const access_token = ref('');
    const expires_at = ref(new Date().getTime());
    const is_logged_in = ref(false);

    function setExpiresAt(expires_in_minutes) {
        const time = new Date().getTime();
        expires_at.value = time + (expires_in_minutes * 60 * 1000);
    }

    function getMillisecondsUntilExpiration() {
        const time = new Date().getTime();

        return expires_at.value - time;
    }

    return { user, access_token, expires_at, is_logged_in, setExpiresAt, getMillisecondsUntilExpiration };
});