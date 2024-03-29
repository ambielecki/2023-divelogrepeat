import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";

class CalculatorProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async calculateDive(params) {
        const filtered_query_params = {};

        for (const query_param in params) {
            if (!params[query_param]) {
                continue;
            }

            filtered_query_params[query_param] = params[query_param];
        }

        const response = await useAsyncGet(this.base_api + '/dive-calculation?' + new URLSearchParams(filtered_query_params).toString());

        return diveLogApiProvider.processApiResponse(response);
    }

    async getTableData() {
        const response = await useAsyncGet(this.base_api + '/dive-tables');

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new CalculatorProvider();