import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, ordeData) => {
    return {
        type: actionTypes.PURCHACE_BURGER_SUCCESS,
        orderId: id,
        orderData: ordeData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHACE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart= () => {
    return {
        type:actionTypes.PURCHACE_BURGER_START
    }
}

export const purchaseBurger = ( orderData, token ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart ());
        axios
        .post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PUTCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.PURCHACE_BURGER_FAIL,
        error:error
    };
};

export const fetchOrderStart = () =>{
    return {
        type: actionTypes.PURCHACE_BURGER_START
    };
};

export const fetchOrder = (token, userId) => {
    return dispatch =>{
        dispatch(fetchOrderStart());
        const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="'+ userId +'"';
        axios
        .get('/orders.json' + queryParams)
        .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
        fetchedOrders.push({
            ...res.data[key],
            id: key
            });
        }
        dispatch(fetchOrderSuccess(fetchedOrders))
        
        })
        .catch(err => {
        dispatch(fetchOrderFail(err));
            });
    }
}