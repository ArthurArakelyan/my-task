import { toast } from 'vue3-toastify';

// Store
import { getTodoState } from './index';

// Services
import { TodoService } from '@/services';

export default {
  async getTodos(context) {
    try {
      context.commit('setLoading', { name: 'getTodos', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board?.id || !user?.id) {
        return;
      }

      const response = await TodoService.getTodos(board.id, user.id);

      context.commit('setTodos', response);

      return response;
    } catch (e) {
      console.log('getTodos', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getTodos', value: false });
    }
  },
  async getCompletedTodos(context) {
    try {
      context.commit('setLoading', { name: 'getCompletedTodos', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board?.id || !user?.id) {
        return;
      }

      const response = await TodoService.getCompletedTodos(board.id, user.id);

      context.commit('setCompletedTodos', response);

      return response;
    } catch (e) {
      console.log('getCompletedTodos', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getCompletedTodos', value: false });
    }
  },
  async getTodo(context, payload) {
    try {
      context.commit('setLoading', { name: 'getTodo', value: true });

      const response = await TodoService.getTodo(payload);

      context.commit('setTodoEntry', response);

      return response;
    } catch (e) {
      console.log('getTodo', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getTodo', value: false });
    }
  },
  async addTodo(context, payload) {
    try {
      context.commit('setLoading', { name: 'addTodo', value: true });

      const user = context.rootGetters['user/user'];
      const board = context.rootGetters['boards/selectedBoard'];
      const labels = context.rootGetters['labels/labels'];
      const label = labels.find((label) => label.id === payload.label);

      if (!user || !board) {
        throw new Error(
          'Before create a to-do, make sure you do have a selected board.'
        );
      }

      const data = {
        completed: false,
        description: '',
        userId: user.id,
        boardId: board.id,
        createdAt: Date.now(),
        ...payload,
      };

      const response = await TodoService.addTodo(data);

      data.id = response.id;

      if (label) {
        await context.dispatch(
          'labels/editLabel',
          {
            ...label,
            count: label.count + 1,
          },
          { root: true }
        );
      }

      toast('To-do has been added successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      context.commit('addTodo', data);

      return data;
    } catch (e) {
      console.log('addTodo', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addTodo', value: false });
    }
  },
  async editTodo(context, payload) {
    try {
      context.commit('setLoading', { name: 'addTodo', value: true });

      const data = { ...payload };

      delete data.id;

      await TodoService.editTodo(payload.id, data);

      data.id = payload.id;

      toast('To-do has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      const todoEntry = context.getters.todoEntry;

      context.commit('changeTodos', data);

      if (todoEntry) {
        context.commit('setTodoEntry', data);
      }

      return data;
    } catch (e) {
      console.log('editTodo', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addTodo', value: false });
    }
  },
  async deleteTodo(context, payload) {
    try {
      context.commit('setLoading', { name: 'deleteTodo', value: true });

      await TodoService.deleteTodo(payload);

      const labels = context.rootGetters['labels/labels'];
      const todos = context.rootGetters['todo/todos'];
      const targetTodo = todos.find((todo) => todo.id === payload);
      const label = targetTodo
        ? labels.find((label) => label.id === targetTodo.label)
        : null;

      if (label) {
        await context.dispatch(
          'labels/editLabel',
          {
            ...label,
            count: label.count > 1 ? label.count - 1 : 0,
          },
          { root: true }
        );
      }

      await Promise.all([
        context.dispatch('deleteTodoChecklist', payload),
        context.dispatch('deleteTodoAttachments', payload),
      ]);

      context.commit('deleteTodo', payload);

      toast('To-do has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      console.log('deleteTodo', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteTodo', value: false });
    }
  },
  async completeTodo(context, payload) {
    try {
      const { id, completed, fromChecklist = false } = payload;

      // collecting data
      const todos = context.getters.todos;
      const completedTodos = context.getters.completedTodos;
      const todoEntry = context.getters.todoEntry;
      const checklist = context.rootGetters['checklist/checklist'];

      const found = completed
        ? todos.find((todo) => todo.id === id)
        : completedTodos.find((todo) => todo.id === id);

      if (!found) {
        return;
      }

      const data = {
        ...found,
        completed,
      };

      delete data.id;

      // request
      await TodoService.editTodo(id, data);

      data.id = id;

      if (!fromChecklist) {
        const todoChecklist = checklist.filter(
          (item) => item.todoId === id && item.completed !== completed
        );

        if (todoChecklist.length) {
          await Promise.all(
            todoChecklist.map((item) => {
              return context.dispatch(
                'checklist/completeChecklistItem',
                { id: item.id, completed, fromTodo: true },
                { root: true }
              );
            })
          );
        }
      }

      // changing state
      if (todoEntry) {
        context.commit('setTodoEntry', data);
      }

      await Promise.all([
        context.dispatch('getTodos'),
        context.dispatch('getCompletedTodos'),
      ]);

      toast(`To-do has been ${!completed ? 'un' : ''}completed successfully.`, {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('completeTodo', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  deleteTodoChecklist(context, payload) {
    try {
      const checklist = context.rootGetters['checklist/checklist'];
      const todoChecklist = checklist.filter((item) => item.todoId === payload);

      return Promise.all(
        todoChecklist.map((item) => {
          return context.dispatch('checklist/deleteChecklistItem', item.id, {
            root: true,
          });
        })
      );
    } catch (e) {
      console.log('deleteTodoChecklist', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  deleteTodoAttachments(context, payload) {
    try {
      const attachments = context.rootGetters['attachments/attachments'];
      const todoAttachments = attachments.filter(
        (attachment) => attachment.todoId === payload
      );

      return Promise.all(
        todoAttachments.map((attachment) => {
          return context.dispatch(
            'attachments/deleteAttachment',
            attachment.id,
            { root: true }
          );
        })
      );
    } catch (e) {
      console.log('deleteTodoAttachments', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  changeTodoEntry(context, payload) {
    context.commit('setTodoEntry', payload);
  },
  resetTodoEntry(context) {
    context.commit('setTodoEntry', null);
  },
  reset(context) {
    context.commit('setState', getTodoState());
  },
};
