import { SET_CART, ADD_TO_CART, CLEAR_CART } from './actionTypes';


const initialState = {
    cartItems: {}, 
};

const cartReducer = (state = initialState, action) => {
    const userEmail = localStorage.getItem('email'); 
    if (!userEmail) {
        console.error("Email не знайдено в localStorage. Кошик не може бути оновлено.");
        return state;
    }

    switch (action.type) {
        case SET_CART:
            if (!action.payload) {
                console.warn(`Порожній payload при оновленні кошика для користувача ${userEmail}`);
                return state; 
            }
            console.log(`Оновлення кошика для користувача ${userEmail}:`, action.payload);
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: action.payload, 
                },
            };

        case ADD_TO_CART: {
            const existingCart = state.cartItems[userEmail] || [];
            const existingItemIndex = existingCart.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.selectedage === action.payload.selectedage &&
                    item.selectedRarity === action.payload.selectedRarity
            );

            let updatedCartItems;
            if (existingItemIndex >= 0) {
                updatedCartItems = [...existingCart];
                updatedCartItems[existingItemIndex].count += action.payload.count;
                console.log("Оновлено кількість товару в кошику:", updatedCartItems);
            } else {
                updatedCartItems = [...existingCart, action.payload];
                console.log("Новий товар додано до кошика:", updatedCartItems);
            }

            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: updatedCartItems,
                },
            };
        }

        case CLEAR_CART:
            console.log(`Очищення кошика для користувача ${userEmail}`);
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: [],
                },
            };

        default:
            return state;
    }
};

export default cartReducer;