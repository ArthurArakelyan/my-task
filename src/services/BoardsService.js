import { where, orderBy } from 'firebase/firestore';

import FirestoreService from './FirestoreService';
import StorageService from './StorageService';

class BoardsService {
  static path = 'boards';

  static getBoards(userId) {
    return FirestoreService.get(this.path, where('userId', '==', userId), orderBy('createdAt', 'asc'));
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

  static getImage(id) {
    return StorageService.get(`${this.path}/${id}`);
  }

  static addImage(image, id, userId) {
    return StorageService.add(`${this.path}/${id}`, image, userId);
  }

  static deleteImage(id) {
    return StorageService.delete(`${this.path}/${id}`);
  }
}

export default BoardsService;
