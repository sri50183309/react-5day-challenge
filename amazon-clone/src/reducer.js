export const initialState = {
    basket: [], 
    user: null
}


export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

// State =>
// Action => What we wanna do
const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET': 
        //get the previous state and add it to the current state and return 
            return {
                ...state, 
                basket: [...state.basket, action.item], 
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket]
            if(index >= 0){
                newBasket.splice(index, 1);
            }else {
                console.warn(
                    'Cant remove product (id: ${action.id}) as its not in basket !'
                )
            }

            return  {
                ...state, 
                basket: newBasket, 
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: []
            }    
        default: 
            return state;
    }
}

export default reducer;