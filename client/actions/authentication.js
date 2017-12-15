import axios from 'axios';
import swal from 'sweetalert2';
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT
} from '../helpers/constants';

/**
 * action creator that sets current user to the store
 * @param {object} payload response from siginup api call
 * @return {object} action object of current user and action type
 */
const signinSuccess = payload => ({
  type: SIGN_IN,
  payload
});

/**
 * action creator that sets current user to the store
 * @param {object} payload response from siginup api call
 * @return {object} action object of current user and action type
 */
const signupSuccess = payload => ({
  type: SIGN_UP,
  payload
});

/**
 * action creator that sets current user to the store
 * @param {object} payload response from siginup api call
 * @return {object} action object of current user and action type
 */
const signoutSuccess = () => ({
  type: SIGN_OUT
});

/**
 * login a user
 * @export
 * @param {object} user users request object
 * @return {void}
 */
export function signinUser(user) {
  return dispatch => (
    axios.post('/api/v1/signin', user)
      .then(({ data }) => {
        swal(`Hi ${data.username}`);
        localStorage.setItem('token', data.token);
        dispatch(signinSuccess(data));
        return data;
      }, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}

/**
 * @export
 * @param {object} user
 * @return {void}
 */
export function signupUser(user) {
  return dispatch => (
    axios.post('/api/v1/signup', user)
      .then(({ data }) => {
        swal(`Hi ${data.username}`);
        localStorage.setItem('token', data.token);
        dispatch(signupSuccess(data));
        return data;
      }, (err) => {
        swal('Oops...', err.response.data.message, 'error');
        return err.response.data;
      })
  );
}

/**
 * @export
 * @param {any} user
 * @return {void}
 */
export function signoutUser() {
  return (dispatch) => {
    dispatch(signoutSuccess());
    localStorage.removeItem('token');
    return true;
  };
}

