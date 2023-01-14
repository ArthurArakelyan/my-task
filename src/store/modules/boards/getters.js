export default {
  boards(state) {
    return state.boards;
  },
  selectedBoard(state) {
    return state.board;
  },
  boardEditEntry(state) {
    return state.boardEditEntry;
  },
  boardDeleteEntry(state) {
    return state.boardDeleteEntry;
  },
  getBoardsLoading(state) {
    return state.loading.getBoards;
  },
  addBoardLoading(state) {
    return state.loading.addBoard;
  },
  deleteBoardLoading(state) {
    return state.loading.deleteBoard;
  },
};
