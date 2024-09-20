import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // Set user data
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload, // Set error message
      };
    default:
      return state;
  }
}
