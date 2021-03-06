import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const DECREMENT_ITEM = 'DECREMENT_ITEM';
const COMPLETE_ORDER = 'COMPLETE_ORDER';

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
const decItem = (item) => ({
  type: DECREMENT_ITEM,
  item,
});
const complete = (emptyCart) => ({
  type: COMPLETE_ORDER,
  emptyCart,
});

/**
 * THUNK CREATORS
 */
export const fetchCartItems = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.get(`/api/line-items/cart`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(setCartItems(data));
  };
};

export const addItemToCart = (productId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.post(
      `/api/line-items/add-to-cart/${productId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(addItem(data[0], data[1]));
  };
};

export const decItemFromLocalCart = (item) => {
  return (dispatch) => {
    const guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
    const newCart = guestCart
      .map((lineItem) => {
        if (lineItem.id === item.id) {
          return { ...lineItem, quantity: lineItem.quantity - 1 };
        } else {
          return lineItem;
        }
      })
      .filter((lineItem) => lineItem.quantity > 0);
    dispatch(setCartItems(newCart));

    window.localStorage.setItem('guestCart', JSON.stringify(newCart));
  };
};

export const addItemToLocalCart = (product) => {
  return (dispatch) => {
    const cart = JSON.parse(window.localStorage.getItem('guestCart'));
    const updateItem = cart.findIndex((item) => item.id === product.id);
    if (updateItem >= 0) {
      cart[updateItem].quantity++;
    } else {
      cart.push({
        id: product.id,
        quantity: 1,
        price: product.price,
        product,
      });
    }
    dispatch(setCartItems(cart));
    const guestCart = JSON.stringify(cart);
    window.localStorage.setItem('guestCart', guestCart);
  };
};

export const destroyLocalItem = (item) => {
  return (dispatch) => {
    const guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
    const newCart = guestCart.filter((lineItem) => lineItem.id !== item.id);

    dispatch(setCartItems(newCart));
    window.localStorage.setItem('guestCart', JSON.stringify(newCart));
  };
};

export const fetchLocalCartItems = () => {
  return (dispatch) => {
    const cart = [...JSON.parse(window.localStorage.getItem('guestCart'))];
    dispatch(setCartItems(cart));
  };
};

export const destroyItem = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/line-items/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(deleteItem(id));
  };
};

export const decrementItem = (item) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(
      `/api/line-items/${item.id}`,
      {
        quantity: item.quantity - 1,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(decItem(data));
  };
};

export const completeOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(
      '/api/line-items/complete-order',
      {},
      { headers: { authorization: token } }
    );
    dispatch(complete([]));
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
    case DECREMENT_ITEM:
      return state.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        } else {
          return item;
        }
      });
    case COMPLETE_ORDER:
      return action.emptyCart;
    default:
      return state;
  }
}
