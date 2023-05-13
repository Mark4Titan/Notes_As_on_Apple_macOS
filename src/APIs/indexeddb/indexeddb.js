import initialState  from "../initialState.json";
import { nanoid } from "nanoid";
import moment from "moment/moment";

function ApiIndexedDB() {
  const dbName = "QuickNotedb";
  let db;

  function connectToDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        db = event.target.result;
        // console.log("Connected to indexedDB");
        resolve();
      };

      request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objStore = db.createObjectStore(dbName, { keyPath: "id" });
        objStore.createIndex("created", "created", { unique: false });
        objStore.createIndex("title", "title", { unique: false });
        objStore.createIndex("content", "content", { unique: false });
        objStore.createIndex("idQuintadb", "idQuintadb", { unique: false });
        objStore.createIndex("indexeddb", "indexeddb", { unique: false });
        objStore.createIndex("quintadb", "quintadb", { unique: false });
        objStore.createIndex("id", "id", { unique: true });
        initialState.forEach((item) => objStore.add(item));
      };
    });
  }

  async function getData() {
    await connectToDB();
    const transaction = db.transaction([dbName], "readonly");
    const objectStore = transaction.objectStore(dbName);
    const data = await new Promise((resolve, reject) => {
      const request = objectStore.getAll();
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });

    const ReData = data.map((el) => ({ ...el, indexeddb: true }));

    return { data: ReData };
  }

  async function addRecord(record) {
    await connectToDB();
    const newCard = {
      ...record,
      created: moment().format("DD.MM.YYYY  (HH:mm)"),
      id: nanoid(),
    };
    await new Promise((resolve, reject) => {
      const transaction = db.transaction([dbName], "readwrite");
      const objectStore = transaction.objectStore(dbName);
      const request = objectStore.add(newCard);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
    return { data: { ...newCard, indexeddb: true } };
  }

  async function deleteRecord(record) {
    await connectToDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction([dbName], "readwrite");
      const objectStore = transaction.objectStore(dbName);
      const request = objectStore.delete(record.id);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
    return { data: record };
  }

  async function editRecord(record) {
    await connectToDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction([dbName], "readwrite");
      const objectStore = transaction.objectStore(dbName);
      const request = objectStore.put(record);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
    return { data: record };
  }

  async function cloneRecord(record) {
    await connectToDB();
    const newCard = {
      ...record,
      id: nanoid(),
      created: moment().format("DD.MM.YYYY  (HH:mm)"),
      title: (record.title += " - Copy!"),
    };
    await new Promise((resolve, reject) => {
      const transaction = db.transaction([dbName], "readwrite");
      const objectStore = transaction.objectStore(dbName);
      const request = objectStore.add(newCard);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
    return { data: { ...newCard, indexeddb: true } };
  }

  function handleDBError(event) {
    console.error(`IndexedDB error: ${event.target.error}`);
  }

  return {
    connectToDB,
    getData,
    addRecord,
    deleteRecord,
    editRecord,
    cloneRecord,
    handleDBError,
  };
}

export default ApiIndexedDB;
