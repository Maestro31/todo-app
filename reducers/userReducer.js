import {
  USER_DISCONNECT,
  USER_SIGNING,
  USER_SIGNING_ABORT,
  USER_SIGNING_FAILED,
  USER_SIGNING_SUCCESS
} from '../actions/constants';

const initialState = {
  isSigning: false,
  isAuthenticated: false,
  errorMessage: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNING:
      return {
        ...initialState,
        isSigning: true
      };
    case USER_SIGNING_FAILED:
      return {
        ...state,
        isSigning: false,
        isAuthenticated: false,
        errorMessage: action.error
      };
    case USER_SIGNING_ABORT:
      return {
        ...state,
        isSigning: false,
        isAuthenticated: false
      };
    case USER_SIGNING_SUCCESS:
      return {
        ...state,
        isSigning: false,
        isAuthenticated: true
      };
    case USER_DISCONNECT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
