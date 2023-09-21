import diveLogApiProvider from "./DiveLogApiProvider";
import { useUserStore } from "@/stores/user";

class ImageProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
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
}

export default new ImageProvider();