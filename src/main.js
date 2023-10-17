import { createApp } from 'vue';
import { createPinia } from 'pinia';
import CKEditor from '@ckeditor/ckeditor5-vue';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "bulma/css/bulma.css";
import 'vue3-carousel/dist/carousel.css'

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(CKEditor);

app.config.globalProperties.$filters = {
    formatDate(value) {
        const date = new Date(value);

        return date.toLocaleString('default')
    },
    formatDateOnly(value) {
        const date = new Date(value);

        return date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }
}

app.mount('#app');
