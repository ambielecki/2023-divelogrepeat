import { useUserStore } from "../stores/user";
import { useAlertStore } from "../stores/alert";

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
        useAlertStore().addAlert('Something went wrong, please try again. If you continue to see this message, please contact support.', useAlertStore().danger);

        return null;
    }
}
