import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

class StorageService {
  static get(path) {
    return getDownloadURL(ref(this.storage, path));
  }

  static add(path, file, userId) {
    const storageRef = ref(this.storage, path);

    return uploadBytes(storageRef, file, {
      customMetadata: {
        userId,
      },
    });
  }

  static delete(path) {
    return deleteObject(ref(this.storage, path));
  }

  static get storage() {
    return getStorage();
  }
}

export default StorageService;
