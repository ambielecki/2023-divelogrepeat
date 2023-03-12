class CalculatorProvider {
    constructor() {
        this.base_api = import.meta.env.VITE_API_URL;
    }

    async caclulateDive(
        dive_1_depth,
        dive_1_time = null,
        surface_interval = null,
        dive_2_depth = null,
        dive_2_time = null,
    ) {
        let options = {
            dive_1_depth: dive_1_depth,
        };

        if (dive_1_time) {
            options.dive_1_time = dive_1_time;
        }

        if (surface_interval) {
            options.surface_interval = surface_interval;
        }

        if (dive_2_depth) {
            options.dive_2_depth = dive_2_depth;
        }

        if (dive_2_time) {
            options.dive_2_time = dive_2_time;
        }

        const params = new URLSearchParams(options);

        try {
            const response = await fetch(this.base_api + '/dive-calculation?' + params, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response?.ok) {
                const json = await response.json();

                return json.data;
            } else {
                const json = await response.json();
                console.log(`HTTP Response Code: ${response?.status} ` + json.message)

                return false;
            }
        } catch (error) {
            console.log('Error');
        }
    }
}

export default new CalculatorProvider();