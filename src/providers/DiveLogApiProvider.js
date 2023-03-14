class DiveLogApiProvider {
    async processApiResponse(response) {
        if (response?.ok) {
            const json = await response.json();

            return json.data;
        } else {
            const json = await response.json();
            console.log(`HTTP Response Code: ${response?.status} ` + json.message);
            // TODO

            return null;
        }
    }
}

export default new DiveLogApiProvider();