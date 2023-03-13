import { useAsyncGet } from "../composables/asyncGet";

class PageProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getHomePage() {
        return await useAsyncGet(this.base_api + '/page/home');
    }
}

export default new PageProvider();