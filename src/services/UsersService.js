import FirestoreService from './FirestoreService';

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
}

export default UsersService;
