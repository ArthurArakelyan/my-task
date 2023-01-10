import { createApp } from 'vue';

import App from './App.vue';

import BaseIcon from './components/UI/BaseIcon.vue';

import router from './router';
import store from './store';

import './registerServiceWorker';

const app = createApp(App);

app.component('base-icon', BaseIcon);

app.use(store);
app.use(router);

app.mount('#app');
