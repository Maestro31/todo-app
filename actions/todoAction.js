import NavigationService from '../NavigationService';
import firestore from '../models/firestore';
import {
  COMPLETED_TODO_VISIBILITY_CHANGE,
  GET_TODOS,
  TODOS_CHANGE
} from './constants';

export function fetchTodosFromList(id: string) {
  return async dispatch => {
    try {
      const todos = await firestore.getTodos(id);
      const todolist = await firestore.getTodoList(id);

      dispatch({ type: GET_TODOS, todolist, todos });
      NavigationService.navigate('Todos', { title: todolist.name });
    } catch (e) {
      console.error(e);
    }
  };
}

export function changeStatusForTodo(
  id: string,
  status: string,
  todoListId: string
) {
  return async dispatch => {
    try {
      await firestore.editTodoStatus(id, status, todoListId);
      const todos = await firestore.getTodos(todoListId);
      dispatch({
        type: TODOS_CHANGE,
        todos: todos
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function addTodoOnList(listId: string, name: string) {
  return async dispatch => {
    try {
      await firestore.addTodo(listId, name);
      dispatch({
        type: TODOS_CHANGE,
        todos: await firestore.getTodos(listId)
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function editTodo(id: string, name: string, todoListId: string) {
  return async dispatch => {
    try {
      await firestore.editTodo(id, name, todoListId);
      dispatch({
        type: TODOS_CHANGE,
        todos: await firestore.getTodos(todoListId)
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function deleteTodo(id: string, todoListId: string) {
  return async dispatch => {
    try {
      await firestore.deleteTodo(id, todoListId);
      dispatch({
        type: TODOS_CHANGE,
        todos: await firestore.getTodos(todoListId)
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function hideCompletedTodos(hideCompletedTodos: boolean) {
  return dispatch => {
    dispatch({ type: COMPLETED_TODO_VISIBILITY_CHANGE, hideCompletedTodos });
  };
}
