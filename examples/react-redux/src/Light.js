import React from "react";
import withXState from "with-xstate";
import { connect } from "react-redux";
import { changeLight } from './store/actions';

const Light = ({ state }) => <h1>Current: {state.value}</h1>;

const mapActionsToXState = dispatch => ({
  state: {
    changeColor: () => {
      console.log("color changed!");
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