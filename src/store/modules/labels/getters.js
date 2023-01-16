export default {
  labels(state) {
    return state.labels;
  },
  hasLabels(state) {
    return !!state.labels.length;
  },
  getLabelsLoading(state) {
    return state.loading.getLabels;
  },
  addLabelLoading(state) {
    return state.loading.addLabel;
  },
  deleteLabelLoading(state) {
    return state.loading.deleteLabel;
  },
};
