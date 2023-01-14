import { where } from 'firebase/firestore';

import FirestoreService from './FirestoreService';

class BoardsService {
  static path = 'boards';

  static getBoards(userId) {
    return FirestoreService.get(this.path, where('userId', '==', userId));
  }

  static getBoard(id) {
    return FirestoreService.getDoc(this.path, id);
  }

  static addBoard(board, id) {
    return FirestoreService.add(this.path, board, id);
  }

  static editBoard(id, board) {
    return FirestoreService.edit(this.path, board, id);
  }

  static deleteBoard(id) {
    return FirestoreService.delete(this.path, id);
  }
}

export default BoardsService;
