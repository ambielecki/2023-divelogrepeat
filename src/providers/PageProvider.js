import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";
import { useAsyncPost } from "@/composables/asyncPost";

class PageProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getHomePage() {
        const response = await useAsyncGet(this.base_api + '/page/home');

        return diveLogApiProvider.processApiResponse(response);
    }

    async postHomePage(page_data) {
        const response = await useAsyncPost(this.base_api + '/admin/home', page_data, true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async postBlogPage(page_data) {
        const response = await useAsyncPost(this.base_api + '/admin/blog', page_data, true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new PageProvider();