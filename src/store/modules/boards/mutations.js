import { setLoading } from '@/utils';

export default {
  setBoards(state, payload) {
    state.boards = payload;
  },
  changeBoards(state, payload) {
    state.boards = state.boards.map((board) => board.id === payload.id ? {
      ...state,
      ...payload,
    } : board);
  },
  deleteBoard(state, payload) {
    state.boards = state.boards.filter((board) => board.id !== payload);
  },
  setBoard(state, payload) {
    state.board = payload;
  },
  setBoardEditEntry(state, payload) {
    state.boardEditEntry = payload;
  },
  setBoardDeleteEntry(state, payload) {
    state.boardDeleteEntry = payload;
  },
  addBoard(state, payload) {
    state.boards.push(payload);
  },
  setLoading,
};
