import { where, orderBy } from 'firebase/firestore';

// Services
import FirestoreService from './FirestoreService';

class LabelsService {
  static path = 'labels';

  static getLabels(boardId) {
    return FirestoreService.get(this.path, where('boardId', '==', boardId), orderBy('createdAt', 'asc'));
  }

  static getLabel(id) {
    return FirestoreService.getDoc(this.path, id);
  }

  static addLabel(label, id) {
    return FirestoreService.add(this.path, label, id);
  }

  static editLabel(id, label) {
    return FirestoreService.edit(this.path, label, id);
  }

  static deleteLabel(id) {
    return FirestoreService.delete(this.path, id);
  }
}

export default LabelsService;
