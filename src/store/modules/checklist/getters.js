export default {
  checklist(state) {
    return state.checklist;
  },
  hasChecklist(state) {
    return !!state.checklist.length;
  },
  getChecklistLoading(state) {
    return state.loading.getChecklist;
  },
  addChecklistItemLoading(state) {
    return state.loading.addChecklistItem;
  },
  deleteChecklistItemLoading(state) {
    return state.loading.deleteChecklistItem;
  },
};
