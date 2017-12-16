import axios from 'axios';
import swal from 'sweetalert2';
import { LOAD_TODOS, UNLOAD_TODOS } from '../helpers/constants';

const loadTodosSuccess = payload => ({
  type: LOAD_TODOS,
  payload
});

const unloadTodoSuccess = () => ({
  type: UNLOAD_TODOS
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
 * @param {object} newTodo users request object
 * @return {void}
 */
export function createTodo(newTodo) {
  return () => (
    axios.post('/api/v1/todo', newTodo, { headers: { token: localStorage.getItem('token') } })
      .then(() => true, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}

/**
 * @export
 * @return {void}
 */
export function unloadTodo() {
  return dispatch => (
    dispatch(unloadTodoSuccess())
  );
}

/**
 * @export
 * @param {object} todoId users request object
 * @return {void}
 */
export function completeTodo(todoId) {
  return () => (
    axios.patch('/api/v1/todo/finish', todoId, { headers: { token: localStorage.getItem('token') } })
      .then(() => true, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}

/**
 * @export
 * @param {object} todoId users request object
 * @return {void}
 */
export function deleteTodo(todoId) {
  return () => (
    axios.delete(`/api/v1/todo/delete?id=${todoId.todoId}`, { headers: { token: localStorage.getItem('token') } })
      .then(() => true, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}
