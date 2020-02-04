import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it teasts well!</h1>
      <div
        style={{
          width: '100%',
          height: '300px',
          margin: 'auto'
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        <Button
          btnType="Danger"
          clicked={props.checkoutCancelled}
        >
          CANCLE
        </Button>
        <Button
          btnType="Success"
          clicked={props.checkoutContineued}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
