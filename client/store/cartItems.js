import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const DELETE_ITEM = 'DELETE_ITEM';

/**
 * ACTION CREATORS
 */
const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  items,
});
const addItem = (item, created) => ({
  type: ADD_ITEM_TO_CART,
  item,
  created,
});
const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

/**
 * THUNK CREATORS
 */
export const fetchCartItems = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/line-items/user/${id}/cart`);
    dispatch(setCartItems(data));
  };
};

export const addItemToCart = (userId, productId) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `/api/line-items/user/${userId}/product/${productId}`
    );
    dispatch(addItem(data[0], data[1]));
  };
};

export const destroyItem = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/line-items/${id}`);
    dispatch(deleteItem(id));
  };
};

export default function cartItems(state = [], action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items;
    case ADD_ITEM_TO_CART:
      if (action.created) {
        return [...state, action.item];
      } else {
        return state.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}
