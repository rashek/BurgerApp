import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
    let summery = <Redirect to="/"/>
    if (this.props.ings){
      const puchasedRedirect =this.props.purchased? <Redirect to="/"/>: null;
      summery = (
        <div>
          {puchasedRedirect}
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
      )
    }
    return summery;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
    // price: state.burgerBuilder.totalPrice,

  }
}



export default connect(mapStateToProps)(Checkout);
