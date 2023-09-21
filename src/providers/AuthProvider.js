import { useAsyncPost } from "../composables/asyncPost";
import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";
import {useUserStore} from "../stores/user";

class AuthProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async login(body) {
       const response = await useAsyncPost(this.base_api + '/login', body);

       return diveLogApiProvider.processApiResponse(response);
    }

    async logout() {
        const response = await useAsyncPost(this.base_api + '/logout', {}, true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async register(body) {
        const response = await useAsyncPost(this.base_api + '/register', body);

        return diveLogApiProvider.processApiResponse(response);
    }

    async refreshToken() {
        const response = await useAsyncPost(this.base_api + '/refresh', {}, true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getUser() {
        const response = await useAsyncGet(this.base_api + '/user', true);

        return diveLogApiProvider.processApiResponse(response);
    }

    checkCachedToken() {
        const access_token = window.localStorage.getItem('dive_access_token');
        const expires_at = window.localStorage.getItem('dive_expires_at');
        if (!access_token || !expires_at) {
            return false;
        }

        const time = new Date().getTime();
        if (time < expires_at) {
            useUserStore().$patch({
                access_token: access_token,
                expires_at: parseInt(expires_at),
                is_logged_in: true,
                has_checked_session: true,
            });

            this.getUser()
                .then((response) => {
                    useUserStore().$patch({
                        user: response.user
                    });
                })

            return true;
        }

        return false;
    }
}

export default new AuthProvider();