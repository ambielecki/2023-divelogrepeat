import diveLogApiProvider from "./DiveLogApiProvider";
import { useAsyncGet } from "@/composables/asyncGet";

export default class GenericProvider {
    constructor(uri) {
        this.url = import.meta.env.VITE_API_URL + uri;
    }

    async getList(params = {}) {
        const filtered_query_params = {};

        for (const query_param in params) {
            if (!params[query_param]) {
                continue;
            }

            filtered_query_params[query_param] = params[query_param];
        }

        const response = await useAsyncGet(this.url + '?' + new URLSearchParams(filtered_query_params).toString(), true);

        return diveLogApiProvider.processApiResponse(response);
    }
}