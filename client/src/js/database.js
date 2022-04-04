import { openDB } from 'idb';

const initdb = async () =>
  openDB('txtEditDb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('txtEditDb')) {
        console.log('txtEditDb database already exists');
        return;
      }
      db.createObjectStore('txtEditDb', { keyPath: 'id', autoIncrement: true });
      console.log('txtEditDb database created');
    },
  });

// allows the information to be added to the database, 
export const putDb = async (content) => {
  console.log('PUT to the database');
  const textEditorDB = await openDB('txtEditDb', 1);
  const transaction = textEditorDB.transaction('txtEditDb', 'readwrite');
  const store = transaction.objectStore('txtEditDb');
  const req = store.add({content})
  const res = await req;
  console.log('Content Has been Stored', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log('GET all from the database');
  const textEditorDB = await openDB('txtEditDb', 1);
  const transaction = textEditorDB.transaction('txtEditDb', 'readonly');
  const store = transaction.objectStore('txtEditDb');
  const req = store.getAll();
  const res = await req;
  console.log('res.value', res);
  return res;
};

initdb();
