import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    // console.log('help');
    this.props.history.goBack();
  };

  checkoutContineuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContineued={
            this.checkoutContineuedHandler
          }
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component= {ContactData}
          // render={() => (
          //   <ContactData
          //     ingredients={this.state.ingredients}
          //     price={this.state.totalPrice}
          //     {...this.props}
          //   />
          // )
        // }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

export default connect(mapStateToProps)(Checkout);
