import { where, orderBy } from 'firebase/firestore';

// Services
import FirestoreService from './FirestoreService';

class TodoService {
  static path = 'todos';

  static getTodos(boardId) {
    return FirestoreService.get(this.path, where('boardId', '==', boardId), where('completed', '==', false), orderBy('createdAt', 'desc'));
  }

  static getCompletedTodos(boardId) {
    return FirestoreService.get(this.path, where('boardId', '==', boardId), where('completed', '==', true), orderBy('createdAt', 'desc'));
  }

  static getTodo(id) {
    return FirestoreService.getDoc(this.path, id);
  }

  static addTodo(todo, id) {
    return FirestoreService.add(this.path, todo, id);
  }

  static editTodo(id, todo) {
    return FirestoreService.edit(this.path, todo, id);
  }

  static deleteTodo(id) {
    return FirestoreService.delete(this.path, id);
  }
}

export default TodoService;
