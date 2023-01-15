import { createStore } from 'vuex';

// Modules
import uiModule from './modules/ui';
import authModule from './modules/auth';
import userModule from './modules/user';
import boardsModule from './modules/boards';
import labelsModule from './modules/labels';

const store = createStore({
  modules: {
    ui: uiModule,
    auth: authModule,
    user: userModule,
    boards: boardsModule,
    labels: labelsModule,
  },
});

export default store;
