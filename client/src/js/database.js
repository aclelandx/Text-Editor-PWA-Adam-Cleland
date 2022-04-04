import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const textEditorDB = await openDB('todos', 1);
  const transaction = textEditorDB.transaction('todos', 'readwrite');
  const store = transaction.objectStore('todos');
  const req = store.put({ id: id, todo: content }, id);
  const res = await req;
  console.log('Content Has been Stored', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log('GET all from the database');
  const textEditorDB = await openDB('jate', 1);
  const transaction = textEditorDB.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const req = store.getAll();
  const res = await req;
  console.log('res.value', res);
  return res;
};

initdb();
