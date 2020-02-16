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

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart ());
        axios
        .post('/orders.json', orderData)
        .then(response => {
            console.log(response.data.name);
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

export const fetchOrder = () => {
    return dispatch =>{
        dispatch(fetchOrderStart());
        axios
      .get('/orders.json')
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