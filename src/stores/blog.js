import { defineStore } from "pinia";
import { ref } from 'vue';
import PageProvider from "@/providers/PageProvider";

export const useBlogStore = defineStore('blog', () => {
    const most_recent_blog = ref({});

    function setMostRecentBlog(data) {
        most_recent_blog.value = data;
    }

    async function getMostRecentBlog() {
        if (!(Object.keys(most_recent_blog.value).length)) {
            const results = await PageProvider.getActiveBlogList({
                page: 1,
                limit: 1,
            });

            if (results.blog_pages?.length > 0) {
                setMostRecentBlog(results.blog_pages[0]);
            }
        }

        return most_recent_blog.value;
    }

    return {
        getMostRecentBlog,
        setMostRecentBlog,
    }
});