import { createStore } from 'vuex';

// Modules
import uiModule from './modules/ui';
import authModule from './modules/auth';

const store = createStore({
  modules: {
    ui: uiModule,
    auth: authModule,
  },
});

export default store;
