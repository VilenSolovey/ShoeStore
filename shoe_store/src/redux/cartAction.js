import { CLEAR_CART, SET_CART } from './actionTypes';


export const loadCartFromLocalStorage = () => {
    return (dispatch) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) {
            console.error("Email не знайдено в localStorage. Неможливо завантажити кошик.");
            return;
        }

        const savedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
        dispatch({ type: SET_CART, payload: savedCart });
    };
};

export const addToCart = (item) => {
  return (dispatch, getState) => {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
          console.error("Email не знайдено. Неможливо додати товар до кошика.");
          return;
      }

      const { cartItems } = getState().cart;
      const userCart = cartItems[userEmail] || [];

      const existingItemIndex = userCart.findIndex(
          (cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize
      );

      let updatedCartItems;
      if (existingItemIndex > -1) {
          updatedCartItems = [...userCart];
          updatedCartItems[existingItemIndex].count += item.count;
      } else {
          updatedCartItems = [...userCart, item];
      }

      dispatch({ type: SET_CART, payload: updatedCartItems });
      saveCartToLocalStorage(userEmail, updatedCartItems); 
  };
};



export const removeFromCart = ({ id, selectedColor, selectedSize }) => {
  return (dispatch, getState) => {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) return;

      const updatedCartItems = getState().cart.cartItems[userEmail]?.filter(
          (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      );

      dispatch({ type: SET_CART, payload: updatedCartItems });
      saveCartToLocalStorage(userEmail, updatedCartItems); 
  };
};

export const updateCartItemCount = ({ id, selectedColor, selectedSize, newCount }) => {
  return (dispatch, getState) => {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) return;

      const updatedCartItems = getState().cart.cartItems[userEmail]?.map((item) =>
          item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
              ? { ...item, count: newCount }
              : item
      );

      const filteredCartItems = updatedCartItems.filter((item) => item.count > 0);

      dispatch({ type: SET_CART, payload: filteredCartItems });
      saveCartToLocalStorage(userEmail, filteredCartItems); 
  };
};

export const clearCart = () => {
    return (dispatch) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) return;

        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        savedCart[userEmail] = [];
        localStorage.setItem('cart', JSON.stringify(savedCart));

        dispatch({ type: CLEAR_CART });
    };
};
const saveCartToLocalStorage = (userEmail, cartItems) => {
    if (!userEmail) {
        console.error("Email не знайдено. Неможливо зберегти кошик.");
        return;
    }
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    console.log(`Товари успішно збережено в localStorage для користувача ${userEmail}:`, cartItems);
};
