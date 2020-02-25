import * as actionType from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false,
    building: false,
};
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const addIngredient =(state, action) => {
    const updatedIngredient={[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building: true
    }
return   updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng={[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
        building: true
    };
return   updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients:action.ingredients, 
        totalPrice:4,
        error:false,
        building: false
    });
}

const fetchIngredientsFailed = (state,  ) => {
    return updateObject(state, {error: true});

}

const reducer = (state = initialState, action ) => { 

    switch(action.type) {
        
        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionType.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        case actionType.REMOVE_INGREDIENT:         
            return removeIngredient(state, action);
        default:
            return state;
    }

};

export default reducer;