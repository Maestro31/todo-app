import firebase from 'react-native-firebase';
import uuid from 'uuid/v4';

const db = firebase.firestore();

function getUserId() {
  if (firebase.auth().currentUser) return firebase.auth().currentUser.uid;
}

function rootDocument() {
  return db.collection('users').doc(getUserId());
}

async function addUser(user) {
  const userRef = await db.collection('users').doc(user.uid);
  if (!userRef.exists) {
    await db
      .collection('users')
      .doc(user.uid)
      .set({
        email: user.email
      });
  }
}

async function addTodoList(todolist) {
  return await rootDocument()
    .collection('todolist')
    .doc(uuid())
    .set({
      ...todolist
    });
}

async function editTodoList(id, name) {
  return await rootDocument()
    .collection('todolist')
    .doc(id)
    .update({ name });
}

async function deleteTodoList(id) {
  return await rootDocument()
    .collection('todolist')
    .doc(id)
    .delete();
}

async function getTodoList(id) {
  const docRef = await rootDocument()
    .collection('todolist')
    .doc(id)
    .get();

  return { id: docRef.id, ...docRef.data() };
}

async function getTodoLists() {
  let todolists = [];
  const querySnapshot = await rootDocument()
    .collection('todolist')
    .get();

  querySnapshot.forEach(doc => {
    todolists.push({ id: doc.id, ...doc.data() });
  });

  return todolists;
}

async function addTodo(listId, name) {
  return await rootDocument()
    .collection('todolist')
    .doc(listId)
    .collection('todo')
    .doc(uuid())
    .set({
      name,
      status: ''
    });
}

async function getTodos(listId) {
  try {
    let todos = [];
    const querySnapshot = await rootDocument()
      .collection('todolist')
      .doc(listId)
      .collection('todo')
      .get();

    querySnapshot.forEach(doc => {
      todos.push({ id: doc.id, ...doc.data() });
    });

    return todos;
  } catch (e) {
    console.error(e);
  }
}

async function editTodo(id, name, listId) {
  return await rootDocument()
    .collection('todolist')
    .doc(listId)
    .collection('todo')
    .doc(id)
    .update({ name });
}

async function editTodoStatus(id, status, listId) {
  return await rootDocument()
    .collection('todolist')
    .doc(listId)
    .collection('todo')
    .doc(id)
    .update({ status });
}

async function deleteTodo(id, listId) {
  return await rootDocument()
    .collection('todolist')
    .doc(listId)
    .collection('todo')
    .doc(id)
    .delete();
}

export default {
  addUser,
  addTodoList,
  getTodoList,
  getTodoLists,
  editTodoList,
  deleteTodoList,
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  editTodoStatus
};
