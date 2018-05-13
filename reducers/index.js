import { combineReducers } from 'redux';
import todoListsReducer from './todoListsReducer';
import todosReducer from './todosReducer';
import userReducer from './userReducer';

export default function getRootReducer(navReducer) {
  return combineReducers({
    navigation: navReducer,
    todoListsReducer: todoListsReducer,
    todosReducer: todosReducer,
    userReducer: userReducer
  });
}
