import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";

class PageProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getHomePage() {
        const response = await useAsyncGet(this.base_api + '/page/home');

        return await diveLogApiProvider.processApiResponse(response);
    }
}

export default new PageProvider();