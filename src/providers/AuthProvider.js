import { useAsyncPost } from "../composables/asyncPost";
import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";

class AuthProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async login(body) {
       const response = await useAsyncPost(this.base_api + '/login', body);

       return await diveLogApiProvider.processApiResponse(response);
    }

    async logout() {
        const response = await useAsyncPost(this.base_api + '/logout', {}, true);

        return await diveLogApiProvider.processApiResponse(response);
    }

    async register(body) {
        const response = await useAsyncPost(this.base_api + '/register', body);

        return await diveLogApiProvider.processApiResponse(response);
    }

    async getUser() {
        const response = await useAsyncGet(this.base_api + '/user', true);

        return await diveLogApiProvider.processApiResponse(response);
    };
}

export default new AuthProvider();