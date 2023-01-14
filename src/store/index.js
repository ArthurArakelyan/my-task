import { createStore } from 'vuex';

// Modules
import uiModule from './modules/ui';
import authModule from './modules/auth';
import userModule from './modules/user';
import boardsModule from './modules/boards';

const store = createStore({
  modules: {
    ui: uiModule,
    auth: authModule,
    user: userModule,
    boards: boardsModule,
  },
});

export default store;
