import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        'https://my-burger-app-f1c13.firebaseio.com/ingredients.json'
      )
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancleHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const PriceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + PriceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const PriceDeductiontion = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - PriceDeductiontion;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery = null;
    let burger = this.state.error ? (
      <p>theres been an error fetching the data..</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummery = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);
