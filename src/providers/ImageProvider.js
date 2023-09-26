import diveLogApiProvider from "./DiveLogApiProvider";
import { useUserStore } from "@/stores/user";
import { useAsyncGet } from "@/composables/asyncGet";
import { useAsyncPatch } from "@/composables/asyncPatch";

class ImageProvider {
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

        const response = await useAsyncGet(this.base_api + '/admin/image?' + new URLSearchParams(filtered_query_params).toString(), true);

        return diveLogApiProvider.processApiResponse(response);
    }

    async postImage(form_data) {
        const response = await fetch(this.base_api + '/admin/image', {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + useUserStore().access_token
            },
            method: 'POST',
            body: form_data,
        })

        return diveLogApiProvider.processApiResponse(response);
    }

    async patchImage(body, id) {
        const response = await useAsyncPatch(this.base_api + '/admin/image/' + id, body, true);

        return diveLogApiProvider.processApiResponse(response);
    }
}

export default new ImageProvider();