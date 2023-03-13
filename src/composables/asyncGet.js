export async function useAsyncGet(url, with_auth = false) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (with_auth) {
        // TODO
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
