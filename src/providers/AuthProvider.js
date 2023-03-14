import { useAsyncPost } from "../composables/asyncPost";
import {useAsyncGet} from "../composables/asyncGet";

class AuthProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async login(body) {
        return await useAsyncPost(this.base_api + '/login', body);
    }

    async logout() {
        return await useAsyncPost(this.base_api + '/logout', {}, true);
    }

    async getUser() {
        return await useAsyncGet(this.base_api + '/user', true);
    };
}

export default new AuthProvider();