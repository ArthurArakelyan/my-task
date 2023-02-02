import { where, orderBy } from 'firebase/firestore';

import FirestoreService from './FirestoreService';
import StorageService from './StorageService';

class AttachmentService {
  static path = 'attachments';

  static getAttachments(boardId, userId) {
    return FirestoreService.get(this.path, where('userId', '==', userId), where('boardId', '==', boardId), orderBy('createdAt', 'asc'));
  }

  static getAttachment(id) {
    return FirestoreService.getDoc(this.path, id);
  }

  static addAttachment(attachment, id) {
    return FirestoreService.add(this.path, attachment, id);
  }

  static editAttachment(id, attachment) {
    return FirestoreService.edit(this.path, attachment, id);
  }

  static deleteAttachment(id) {
    return FirestoreService.delete(this.path, id);
  }

  static getFile(id) {
    return StorageService.get(`${this.path}/${id}`);
  }

  static addFile(file, id, userId) {
    return StorageService.add(`${this.path}/${id}`, file, userId);
  }

  static deleteFile(id) {
    return StorageService.delete(`${this.path}/${id}`);
  }
}

export default AttachmentService;
