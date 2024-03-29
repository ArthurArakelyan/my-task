import {
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
  static login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  static signup(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  static logout() {
    return signOut(this.auth);
  }

  static changePassword(password) {
    return updatePassword(this.auth.currentUser, password);
  }

  static changeEmail(email) {
    return updateEmail(this.auth.currentUser, email);
  }

  static onAuthChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  static userId() {
    return this.auth.currentUser?.uid;
  }

  static authUser() {
    return this.auth.currentUser;
  }

  static isAuth() {
    return !!this.auth.currentUser;
  }

  static get auth() {
    return getAuth();
  }
}

export default AuthService;
