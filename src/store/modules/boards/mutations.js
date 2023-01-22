import { setLoading, setState } from '@/utils';

export default {
  setBoards(state, payload) {
    state.boards = payload;
  },
  changeBoards(state, payload) {
    state.boards = state.boards.map((board) => board.id === payload.id ? {
      ...state,
      ...payload,
    } : board);

    if (state.board?.id === payload.id) {
      state.board = payload;
    }
  },
  deleteBoard(state, payload) {
    state.boards = state.boards.filter((board) => board.id !== payload);
  },
  setBoard(state, payload) {
    state.board = payload;
  },
  addBoard(state, payload) {
    state.boards.push(payload);
  },
  setLoading,
  setState,
};
