import { LOAD_TODOS, UNLOAD_TODOS } from '../helpers/constants';

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        todos: [
          ...action.payload
        ]
      };

    case UNLOAD_TODOS:
      return {
        todos: []
      };

    default:
      return state;
  }
};
