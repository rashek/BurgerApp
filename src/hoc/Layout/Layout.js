import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <Toolbar 
        isLogged={this.props.isLoggedIn}
        drawerToggleClicked={this.slideDrawerClosedHandler} />
        <SideDrawer 
        isLogged={this.props.isLoggedIn}
        open={this.state.showSideDrawer} 
        closed={this.showSideDrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    isLoggedIn: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout) ;
