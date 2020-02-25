import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as action from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
    };

  purchaseHandler = () => {
    if(this.props.isLoggedIn){
      this.setState({ purchasing: true });
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth')
    }
    
  };

  purchaseCancleHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => { 
    this.props.onInitPurchase();      
    this.props.history.push('/checkout');
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.props.ings[type];
  //   const updateCount = oldCount + 1;
  //   const updateIngredients = {
  //     ...this.props.ings
  //   };
  //   updateIngredients[type] = updateCount;
  //   const PriceAddition = INGREDIENTS_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + PriceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updateIngredients
  //   });
  //   this.updatePurchaseState(updateIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updateCount = oldCount - 1;
  //   const updateIngredients = {
  //     ...this.props.ings
  //   };
  //   updateIngredients[type] = updateCount;
  //   const PriceDeductiontion = INGREDIENTS_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - PriceDeductiontion;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updateIngredients
  //   });
  //   this.updatePurchaseState(updateIngredients);
  // };

  render() {
    const disabledInfo = {
      ...this.props.ings  
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery = null;
    let burger = this.props.error ? (
      <p>theres been an error fetching the data..</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isLogged={this.props.isLoggedIn}
          />
        </Aux>
      );

      orderSummery = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCnacelled={this.purchaseCancleHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummery = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch(action.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(action.removeIngredient(igName)),
    onInitIngredients:()=> dispatch(action.initIngredients()),
    onInitPurchase: () => dispatch(action.purchaseInit()),
    onSetAuthRedirectPath: (path)=> dispatch (action.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
