import { where, orderBy } from 'firebase/firestore';

import FirestoreService from './FirestoreService';

class ChecklistService {
  static path = 'checklist';

  static getChecklist(boardId, userId) {
    return FirestoreService.get(
      this.path,
      where('userId', '==', userId),
      where('boardId', '==', boardId),
      orderBy('createdAt', 'asc')
    );
  }

  static getTodoChecklist(todoId) {
    return FirestoreService.get(
      this.path,
      where('todoId', '==', todoId),
      orderBy('createdAt', 'asc')
    );
  }

  static addChecklistItem(item, id) {
    return FirestoreService.add(this.path, item, id);
  }

  static editChecklistItem(id, item) {
    return FirestoreService.edit(this.path, item, id);
  }

  static deleteChecklistItem(id) {
    return FirestoreService.delete(this.path, id);
  }
}

export default ChecklistService;
