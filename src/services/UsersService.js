import FirestoreService from './FirestoreService';
import StorageService from './StorageService';

class UsersService {
  static path = 'users';

  static getUsers() {
    return FirestoreService.get(this.path);
  }

  static getUser(id) {
    return FirestoreService.getDoc(this.path, id);
  }

  static addUser(user, id) {
    return FirestoreService.add(this.path, user, id);
  }

  static editUser(id, user) {
    return FirestoreService.edit(this.path, user, id);
  }

  static deleteUser(id) {
    return FirestoreService.delete(this.path, id);
  }

  static getAvatar(id) {
    return StorageService.get(`${this.path}/${id}`);
  }

  static addAvatar(image, id) {
    return StorageService.add(`${this.path}/${id}`, image, id);
  }

  static deleteAvatar(id) {
    return StorageService.delete(`${this.path}/${id}`);
  }
}

export default UsersService;
