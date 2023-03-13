import { useAsyncGet } from "../composables/asyncGet";

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

        return await useAsyncGet(this.base_api + '/dive-calculation?' + new URLSearchParams(filtered_query_params).toString());
    }
}

export default new CalculatorProvider();