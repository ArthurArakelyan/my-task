import { doc, collection, query, getDocs, setDoc, getDoc, addDoc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';

class FirestoreService {
  static async get(path, ...getQuery) {
    const dbCollection = collection(this.db, path);

    const pathWithQuery = getQuery.length ? query(dbCollection, ...getQuery) : dbCollection;

    const response = await getDocs(pathWithQuery);

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
    const newDoc = id ? doc(this.db, path, id) : collection(this.db, path);

    if (id) {
      return setDoc(newDoc, data);
    }

    return addDoc(newDoc, data);
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
