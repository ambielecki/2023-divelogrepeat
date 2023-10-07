import { defineStore } from "pinia";
import { ref } from 'vue';
import PageProvider from "@/providers/PageProvider";

export const useHomePageStore = defineStore('home_page', () => {
    const home_page = ref({});

    function setHomePage(data) {
        home_page.value = data;
    }

    async function getHomePage() {
        if (!(Object.keys(home_page.value).length)) {
            const results = await PageProvider.getHomePage();
            setHomePage(results.home_page);
        }

        return home_page.value;
    }

    return {
        getHomePage,
        setHomePage,
    }
});