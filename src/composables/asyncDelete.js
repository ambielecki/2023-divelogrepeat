import { useAlertStore } from "@/stores/alert";
import { addHeaders } from "./addHeaders";

export async function useAsyncDelete(url) {
    let options = {
        method: "DELETE",
    };

    options = addHeaders(options, true);

    try {
        return await fetch(url, options);
    } catch (error) {
        useAlertStore().addAlert('Something went wrong, please try again. If you continue to see this message, please contact support.', useAlertStore().danger);

        return null;
    }
}
