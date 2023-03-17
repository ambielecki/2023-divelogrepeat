import { useAsyncGet } from "../composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";

class DiveLogProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getList() {
        const response = await useAsyncGet(this.base_api + '/dive-log', true);

        return await diveLogApiProvider.processApiResponse(response);
    }
}

export default new DiveLogProvider();