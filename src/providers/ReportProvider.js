import { useAsyncGet } from "@/composables/asyncGet";
import diveLogApiProvider from "./DiveLogApiProvider";

class ReportProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async getUsersReport() {
        const response = await useAsyncGet(this.base_api + '/admin/reports/users', true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async getDiveLogsReport() {
        const response = await useAsyncGet(this.base_api + '/admin/reports/logs', true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new ReportProvider();