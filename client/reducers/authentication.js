import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../helpers/constants';

const initialState = {
  username: '',
  authenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, {
        username: action.payload.username,
        authenticated: true
      });

    case SIGN_IN:
      return Object.assign({}, state, {
        username: action.payload.username,
        authenticated: true
      });

    case SIGN_OUT:
      return Object.assign({}, state, {
        username: '',
        authenticated: false
      });

    default:
      return state;
  }
};
