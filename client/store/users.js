import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS';

/**
 * ACTION CREATORS
 */
const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
  const token = window.localStorage.getItem('token');
  return async (dispatch) => {
    const { data } = await axios.get('/api/users', {
      headers: { authorization: token },
    });
    dispatch(setUsers(data));
  };
};

export default function users(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
