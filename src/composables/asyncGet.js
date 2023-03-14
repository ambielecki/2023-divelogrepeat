import {useUserStore} from "../stores/user";

export async function useAsyncGet(url, with_auth = false) {
    const userStore = useUserStore();

    let options = {
        method: "GET",
    };

    if (with_auth) {
        options.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userStore.access_token
        };
    } else {
        options.headers = {
            "Content-Type": "application/json",
        };
    }

    try {
        const response = await fetch(url, options);

        if (response?.ok) {
            const json = await response.json();

            return json.data;
        } else {
            const json = await response.json();
            console.log(`HTTP Response Code: ${response?.status} ` + json.message)

            return null;
        }
    } catch (error) {
        console.log('Error');

        return null;
    }
}
