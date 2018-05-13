import { TODOLIST_CHANGE } from '../actions/constants';

const initialState = {
  lists: []
};

export default function todoListsReducer(state = initialState, action) {
  switch (action.type) {
    case TODOLIST_CHANGE:
      return {
        ...state,
        lists: action.lists
      };
    default:
      return state;
  }
}
