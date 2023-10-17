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

    async getPublishedBlogList(params = {}) {
        const filtered_query_params = {};

        for (const query_param in params) {
            if (!params[query_param]) {
                continue;
            }

            filtered_query_params[query_param] = params[query_param];
        }

        const response = await useAsyncGet(this.base_api + '/blog?' + new URLSearchParams(filtered_query_params).toString());

        return diveLogApiProvider.processApiResponse(response);
    }

    async getActiveBlogList(params = {}) {
        const filtered_query_params = {};

        for (const query_param in params) {
            if (!params[query_param]) {
                continue;
            }

            filtered_query_params[query_param] = params[query_param];
        }

        const response = await useAsyncGet(this.base_api + '/admin/blog?' + new URLSearchParams(filtered_query_params).toString(), true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getBlogItem(slug) {
        const response = await useAsyncGet(this.base_api + '/blog/' + slug);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getBlogByParent(id) {
        const response = await useAsyncGet(this.base_api + '/admin/blog/' + id, true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async postBlogPage(page_data) {
        const response = await useAsyncPost(this.base_api + '/admin/blog', page_data, true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new PageProvider();