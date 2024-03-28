import { openDB } from "idb";

const indexedDBService = {
  getMemos: async () => {
    try {
      const db = await openDB("VoiceMemosDB", 3);

      const transaction = db.transaction("voiceMemos", "readonly");
      const store = transaction.objectStore("voiceMemos");
      const allItems = await store.getAll();

      // Map items to include both id and pageName
      const memoPages = allItems.map(item => ({
        id: item.id,
        pageName: item.pageName,
        audioBlob: item.audioBlob,
      }));

      return memoPages;
    } catch (error) {
      console.error("Error retrieving memo pages from IndexedDB:", error);
    }
  },

  createMemo: async (blob: any, pageName: any) => {
    try {
      const db = await openDB("VoiceMemosDB", 3, {
        upgrade(db) {
          db.createObjectStore("voiceMemos", {
            keyPath: "id",
            autoIncrement: true,
          });
        },
      });

      const transaction = db.transaction("voiceMemos", "readwrite"); // Use the correct object store name here
      const store = transaction.objectStore("voiceMemos");

      const id = await store.add({ audioBlob: blob, pageName });

      console.log("Voice memo saved to IndexedDB with ID:", id);
    } catch (error) {
      console.error("Error saving audio to IndexedDB:", error);
    }
  },

  deleteMemo: async (id: any) => {
    try {
      const db = await openDB("VoiceMemosDB", 3);

      const transaction = db.transaction("voiceMemos", "readwrite");
      const store = transaction.objectStore("voiceMemos");

      await store.delete(id);

      console.log("Memo with id", id, "deleted successfully.");
    } catch (error) {
      console.error("Error deleting memo from IndexedDB:", error);
    }
  },

  getPhotos: async () => {
    try {
      const db = await openDB("photosDB", 3);

      const transaction = db.transaction("photos", "readonly");
      const store = transaction.objectStore("photos");

      const allItems = await store.getAll();

      // Map items to include both id and pageName
      const photoPages = allItems.map(item => ({
        id: item.id,
        data: item.data,
      }));

      return photoPages;
    } catch (error) {
      console.error("Error retrieving memo pages from IndexedDB:", error);
    }
  },

  createPhoto: async (blob: any) => {
    try {
      const db = await openDB("photosDB", 3, {
        upgrade(db) {
          db.createObjectStore("photos", {
            keyPath: "id",
            autoIncrement: true,
          });
        },
      });

      const transaction = db.transaction("photos", "readwrite");
      const store = transaction.objectStore("photos");

      const id = await store.add({ data: blob });
      console.log(`Photo added with ID: ${id}`);
    } catch (error) {
      console.error("Error saving photo to IndexedDB:", error);
    }
  },

  deletePhoto: async (id: any) => {
    try {
      const db = await openDB("photosDB", 3);

      const transaction = db.transaction("photos", "readwrite");
      const store = transaction.objectStore("photos");

      await store.delete(id);

      console.log("Photo with id", id, "deleted successfully.");
    } catch (error) {
      console.error("Error deleting photo from IndexedDB:", error);
    }
  },
};

export default indexedDBService;
