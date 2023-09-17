import { useUserStore } from "@/stores/user";
import { useAlertStore } from "@/stores/alert";
import { addHeaders } from "./addHeaders";

export async function useAsyncPut(url, body, with_auth = false) {
    const userStore = useUserStore();

    let options = {
        method: "PUT",
        body: JSON.stringify(body),
    };

    options = addHeaders(options, with_auth);

    try {
        return await fetch(url, options);
    } catch (error) {
        useAlertStore().addAlert('Something went wrong, please try again. If you continue to see this message, please contact support.', useAlertStore().danger);

        return null;
    }
}
