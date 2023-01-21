export default {
  boards(state) {
    return state.boards;
  },
  hasBoards(state) {
    return !!state.boards.length;
  },
  selectedBoard(state) {
    return state.board;
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
