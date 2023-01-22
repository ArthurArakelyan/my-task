import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// Store
import actions from './actions';

// Modules
import uiModule from './modules/ui';
import authModule from './modules/auth';
import userModule from './modules/user';
import boardsModule from './modules/boards';
import labelsModule from './modules/labels';
import todoModule from './modules/todo';

const store = createStore({
  modules: {
    ui: uiModule,
    auth: authModule,
    user: userModule,
    boards: boardsModule,
    labels: labelsModule,
    todo: todoModule,
  },
  plugins: [createPersistedState()],
  strict: true,
  actions,
});

export default store;
