import { combineReducers } from 'redux';

import burgerBuilder from './burgerBuilder';
import order from './order'

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: order,
})

export default rootReducer;