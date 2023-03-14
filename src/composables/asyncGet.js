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
        return await fetch(url, options);
    } catch (error) {
        console.log('Error');

        return null;
    }
}
