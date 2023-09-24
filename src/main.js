import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "bulma/css/bulma.css";

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.globalProperties.$filters = {
    formatDate(value) {
        const date = new Date(value);

        return date.toLocaleString('default')
    }
}

app.mount('#app');
