import diveLogApiProvider from "./DiveLogApiProvider";
import { useUserStore } from "@/stores/user";
import { useAsyncGet } from "@/composables/asyncGet";

class TagProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getList(params = {}) {
        const filtered_query_params = {};

        for (const query_param in params) {
            if (!params[query_param]) {
                continue;
            }

            filtered_query_params[query_param] = params[query_param];
        }

        const response = await useAsyncGet(this.base_api + '/admin/tag?' + new URLSearchParams(filtered_query_params).toString(), true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new TagProvider();