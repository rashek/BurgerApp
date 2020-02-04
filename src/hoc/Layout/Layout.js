import React, { Component } from 'react';

import classes from './Layout.module.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  showSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  slideDrawerClosedHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.slideDrawerClosedHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.showSideDrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
