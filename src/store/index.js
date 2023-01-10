import { createStore } from 'vuex';

// Modules
import uiModule from './modules/ui';

const store = createStore({
  modules: {
    ui: uiModule,
  },
});

export default store;
