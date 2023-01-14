import { createStore } from 'vuex';

// Modules
import uiModule from './modules/ui';
import authModule from './modules/auth';
import userModule from './modules/user';

const store = createStore({
  modules: {
    ui: uiModule,
    auth: authModule,
    user: userModule,
  },
});

export default store;
