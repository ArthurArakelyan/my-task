import { toast } from 'vue3-toastify';

// Store
import { getChecklistState } from '@/store/modules/checklist/index';

// Services
import { ChecklistService } from '@/services';

export default {
  async getChecklist(context) {
    try {
      context.commit('setLoading', { name: 'getChecklist', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board || !user) {
        return;
      }

      const response = await ChecklistService.getChecklist(board.id, user.id);

      context.commit('setChecklist', response);

      return response;
    } catch (e) {
      console.log('getChecklist', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getChecklist', value: false });
    }
  },
  async addChecklistItem(context, payload) {
    try {
      context.commit('setLoading', { name: 'addChecklistItem', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board || !user) {
        throw new Error('Before create a checklist item, make sure you do have a selected board.');
      }

      const data = {
        ...payload,
        completed: false,
        userId: user.id,
        boardId: board.id,
        createdAt: Date.now(),
      };

      const response = await ChecklistService.addChecklistItem(data);

      data.id = response.id;

      await context.dispatch('checkTodoCompletionAfterDeleteAdd', data);

      context.commit('addChecklistItem', data);

      toast('Check list item has been added successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('addChecklistItem', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addChecklistItem', value: false });
    }
  },
  async editChecklistItem(context, payload) {
    try {
      const data = { ...payload };

      delete data.id;

      await ChecklistService.editChecklistItem(payload.id, data);

      data.id = payload.id;

      context.commit('changeChecklistItem', data);

      toast('Check list item has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('editChecklistItem', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  async deleteChecklistItem(context, payload) {
    try {
      context.commit('setLoading', { name: 'deleteChecklistItem', value: true });

      await ChecklistService.deleteChecklistItem(payload);

      await context.dispatch('checkTodoCompletionAfterDelete', payload);

      context.commit('deleteChecklistItem', payload);

      toast('Check list item has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      console.log('deleteChecklistItem', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteChecklistItem', value: false });
    }
  },
  async completeChecklistItem(context, payload) {
    const { id, completed, fromTodo = false } = payload;

    const checklist = context.getters.checklist;

    const found = checklist.find((item) => item.id === id);

    if (!found) {
      throw new Error('Something went wrong');
    }

    const data = {
      ...found,
      completed,
    };

    await ChecklistService.editChecklistItem(id, data);

    data.id = id;

    if (!fromTodo) {
      const todos = context.rootGetters['todo/todos'];
      const completedTodos = context.rootGetters['todo/completedTodos'];
      const todoChecklist = checklist.filter((item) => item.todoId === found.todoId);
      const notCompletedChecklist = todoChecklist.filter((item) => !item.completed);
      const foundTodo = todos.find((todo) => todo.id === found.todoId) || completedTodos.find((todo) => todo.id === found.todoId);

      if (notCompletedChecklist.length === 1 && completed) {
        await context.dispatch('todo/completeTodo', { id: foundTodo.id, completed: true, fromChecklist: true }, { root: true });
      } else if (notCompletedChecklist.length === 0 && !completed) {
        await context.dispatch('todo/completeTodo', { id: foundTodo.id, completed: false, fromChecklist: true }, { root: true });
      }
    }

    context.commit('changeChecklistItem', data);

    toast(`Check list item has been ${completed ? '' : 'un'}completed successfully.`, {
      type: 'success',
      hideProgressBar: true,
    });

    return data;
  },
  async checkTodoCompletionAfterDeleteAdd(context, payload) {
    const checklist = context.getters.checklist;
    const todoChecklist = checklist.filter((item) => item.todoId === payload.todoId);
    const completedChecklist = todoChecklist.filter((item) => item.completed);

    if (completedChecklist.length === todoChecklist.length) {
      await context.dispatch('todo/completeTodo', { id: payload.todoId, completed: false, fromChecklist: true }, { root: true });
    }
  },
  async checkTodoCompletionAfterDelete(context, payload) {
    const checklist = context.getters.checklist;
    const checklistItem = checklist.find((item) => item.id === payload);
    const todoChecklist = checklist.filter((item) => item.todoId === checklistItem.todoId);
    const notCompletedChecklist = todoChecklist.filter((item) => !item.completed);

    if (todoChecklist.length > 1 && notCompletedChecklist.length === 1 && notCompletedChecklist[0].id === checklistItem.id) {
      await context.dispatch('todo/completeTodo', { id: checklistItem.todoId, completed: true, fromChecklist: true }, { root: true });
    }
  },
  reset(context) {
    context.commit('setState', getChecklistState());
  },
};
