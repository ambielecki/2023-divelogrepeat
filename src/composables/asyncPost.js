import { useUserStore } from "../stores/user";

export async function useAsyncPost(url, body, with_auth = false) {
    const userStore = useUserStore();

    let options = {
        method: "POST",
        body: JSON.stringify(body),
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
