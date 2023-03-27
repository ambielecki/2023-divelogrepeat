import { useUserStore } from "../stores/user";

export function addHeaders(options, with_auth = false) {
    if (with_auth) {
        options.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore().access_token
        };
    } else {
        options.headers = {
            "Content-Type": "application/json",
        };
    }

    return options;
}