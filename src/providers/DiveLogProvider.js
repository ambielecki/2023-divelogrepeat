import { useAsyncGet } from "@/composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";
import { useAsyncPost } from "@/composables/asyncPost";
import { useAsyncPut } from "@/composables/asyncPut";
import { useAsyncDelete } from "@/composables/asyncDelete";

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
        const response = await useAsyncGet(this.base_api + '/dive-log/max-dive', true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async putUpdateDetails(body, id) {
        const response = await useAsyncPut(this.base_api + '/dive-log/' + id, body, true);

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

    async delete(id) {
        const response = await useAsyncDelete(this.base_api + '/dive-log/' + id);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new DiveLogProvider();