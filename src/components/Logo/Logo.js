import React from 'react';

import burgerLogo from '../../assets/Images/28.1 burger-logo.png';
import classes from './Logo.module.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="" />
  </div>
);

export default logo;
