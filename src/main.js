import { createApp } from 'vue';

import App from './App.vue';

import BaseIcon from './components/UI/BaseIcon.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
import BaseLoader from './components/UI/BaseLoader.vue';

import router from './router';
import store from './store';
import { clickOutside } from './directives';

import { initializeFirebaseApp } from './utils';

import './registerServiceWorker';
import 'vue3-toastify/dist/index.css';

initializeFirebaseApp();

const app = createApp(App);

app.directive('click-outside', clickOutside);

app.component('base-icon', BaseIcon);
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);
app.component('base-loader', BaseLoader);

app.use(store);
app.use(router);

app.mount('#app');
