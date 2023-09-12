import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";
import {useAsyncPost} from "../composables/asyncPost";

class DiveLogProvider {
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

        const response = await useAsyncGet(this.base_api + '/dive-log?' + new URLSearchParams(filtered_query_params).toString(), true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getDetails(id) {
        const response = await useAsyncGet(this.base_api + '/dive-log/' + id, true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getMaxDive() {
        const response = await useAsyncGet(this.base_api + '/dive-log/max-dive-number', true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getLastPressureGroup() {
        const response = await useAsyncGet(this.base_api + '/dive-log/last-dive-pg', true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async postCreate(body) {
        const response = await useAsyncPost(this.base_api + '/dive-log', body, true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new DiveLogProvider();