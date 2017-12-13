import axios from 'axios';
import swal from 'sweetalert2';
import { LOAD_TODOS } from '../helpers/constants';

const loadTodosSuccess = payload => ({
  type: LOAD_TODOS,
  payload
});

/**
 * load users todos
 * @export
 * @return {void}
 */
export function loadTodos() {
  return dispatch => (
    axios.get('/api/v1/todo/list', { headers: { token: localStorage.getItem('token') } })
      .then(({ data }) => {
        dispatch(loadTodosSuccess(data.todos));
        return data;
      }, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}

/**
 * @export
 * @return {void}
 */
export function createTodo() {
  console.log('creating group');
}
