import { openDB } from "idb";

const dbname = "eLogbook";

const dbPromise = openDB(`${dbname}-store`, 1, {
  upgrade(db) {
    db.createObjectStore(dbname);
  },
});

const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      if (reader.result !== null) {
        resolve(reader.result as ArrayBuffer);
      }
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
};

export const getDB = async (query: number): Promise<ArrayBuffer> => {
  return (await dbPromise).get(dbname, query);
};

export const setDB = async (val: Blob, query: number) => {
  const value = await blobToArrayBuffer(val);
  return (await dbPromise).put(dbname, value, query);
};

export const delDB = async (query: number) => {
  return (await dbPromise).delete(dbname, query);
};

export const clearDB = async () => {
  return (await dbPromise).clear(dbname);
};

export const keysDB = async () => {
  return (await dbPromise).getAllKeys(dbname);
};

dbPromise.catch((err) => console.log("indexDB ERROR", err));
