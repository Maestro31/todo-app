import {
  COMPLETED_TODO_VISIBILITY_CHANGE,
  GET_TODOS,
  TODOS_CHANGE,
  TODO_CHANGE_STATUS,
  USER_STATE_CHANGE
} from '../actions/constants';

const initialState = {
  todoList: {},
  hideCompletedTodos: false,
  todos: []
};

function sortCompletedTodos(todos) {
  let completedTodos = [];
  let notCompletedTodos = [];

  todos.forEach(element => {
    if (element.status === 'completed') {
      completedTodos.push(element);
    } else {
      notCompletedTodos.push(element);
    }
  });

  return notCompletedTodos.concat(completedTodos);
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todoList: action.todolist,
        todos: sortCompletedTodos(action.todos)
      };
    case TODO_CHANGE_STATUS:
      return {
        ...state,
        todos: sortCompletedTodos(state.todos)
      };
    case TODOS_CHANGE:
      return {
        ...state,
        todos: sortCompletedTodos(action.todos)
      };
    case COMPLETED_TODO_VISIBILITY_CHANGE:
      return {
        ...state,
        hideCompletedTodos: action.hideCompletedTodos
      };
    case USER_STATE_CHANGE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
