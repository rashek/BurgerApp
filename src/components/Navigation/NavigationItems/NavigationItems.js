import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isLogged ?
    <NavigationItem link="/orders">Orders</NavigationItem>:null}
    {props.isLogged ?
    <NavigationItem link="/logout">Logout</NavigationItem>:
    <NavigationItem link="/auth">Login</NavigationItem>
    }
    
  </ul>
);

export default navigationItems;
