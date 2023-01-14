import { doc, collection, getDocs, getDoc, setDoc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';

class FirestoreService {
  static async get(path) {
    const response = await getDocs(collection(this.db, path));

    const docs = response.docs;

    if (!docs.length) {
      return [];
    }

    return docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  static async getDoc(path, id) {
    const newDoc = doc(this.db, path, id);

    const response = await getDoc(newDoc);

    if (!response.exists()) {
      throw new Error(`Item doesn't exist.`);
    }

    return { id: response.id, ...response.data() };
  }

  static async add(path, data, id) {
    const newDoc = doc(this.db, path, id);

    return setDoc(newDoc, data);
  }

  static async edit(path, data, id) {
    const newDoc = doc(this.db, path, id);

    return updateDoc(newDoc, data);
  }

  static async delete(path, id) {
    const newDoc = doc(this.db, path, id);

    return deleteDoc(newDoc);
  }

  static get db() {
    return getFirestore();
  }
}

export default FirestoreService;
