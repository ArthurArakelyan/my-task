export default {
  resetState(context) {
    context.dispatch('ui/reset');
    context.dispatch('auth/reset');
    context.dispatch('user/reset');
    context.dispatch('boards/reset');
    context.dispatch('labels/reset');
    context.dispatch('todo/reset');
    context.dispatch('checklist/reset');
    context.dispatch('attachments/reset');
  },
};
