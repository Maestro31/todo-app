import firestore from '../models/firestore';
import { TODOLIST_CHANGE } from './constants';

export function fetchAllTodoLists() {
  return async dispatch => {
    // execRealm(realm => {
    //   dispatch({ type: TODOLIST_CHANGE, lists: realm.objects('TodoList') });
    // });

    const todolists = await firestore.getTodoLists();
    dispatch({ type: TODOLIST_CHANGE, lists: todolists });
  };
}

export function addTodoList(name: string) {
  return async dispatch => {
    // writeRealm(db => {
    //   db.create('TodoList', {
    //     id: uuid(),
    //     name,
    //     todos: []
    //   });
    //   dispatch({ type: TODOLIST_CHANGE, lists: db.objects('TodoList') });
    // });
    try {
      await firestore.addTodoList({ name });
      dispatch({
        type: TODOLIST_CHANGE,
        lists: await firestore.getTodoLists()
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function editTodoList(id: string, name: string) {
  return async dispatch => {
    // writeRealm(db => {
    //   const todoList = db.objectForPrimaryKey('TodoList', id);
    //   todoList.name = name;
    //   dispatch({ type: TODOLIST_CHANGE, lists: db.objects('TodoList') });
    // });

    try {
      await firestore.editTodoList(id, name);
      dispatch({
        type: TODOLIST_CHANGE,
        lists: await firestore.getTodoLists()
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function deleteTodoList(id: string) {
  return async dispatch => {
    // writeRealm(db => {
    //   const todoList = db.objectForPrimaryKey('TodoList', id);
    //   db.delete(todoList);
    //   dispatch({ type: TODOLIST_CHANGE, lists: db.objects('TodoList') });
    // });

    try {
      await firestore.deleteTodoList(id);
      dispatch({
        type: TODOLIST_CHANGE,
        lists: await firestore.getTodoLists()
      });
    } catch (e) {
      console.error(e);
    }
  };
}
