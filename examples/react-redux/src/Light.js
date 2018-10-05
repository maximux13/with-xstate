import React from 'react';
import { connect } from 'react-redux';
import { changeLight } from './store/actions';

import withXState from '../../../lib';

const Light = ({ state }) => <h1>Current: {state.value}</h1>;

const mapActionsToXState = (dispatch, ownProps) => ({
  state: {
    changeColor: () => {
      console.log('color changed!', ownProps.state.value);
    },
    bye: () => {
      setTimeout(() => {
        dispatch(changeLight());
      }, 1000);
    }
  }
});

const mapStateToProps = state => ({
  state: state.machine
});

const ComponentWithXState = withXState(mapActionsToXState)(Light);

export default connect(mapStateToProps)(ComponentWithXState);
