import React from 'react';
import withXState from '../../../lib';

const Light = ({ state }) => <h1>Current: {state.value}</h1>;

const mapActionsToXState = (_, ownProps) => ({
  state: {
    changeColor: () => {
      console.log('color changed!', ownProps.state.value);
    }
  }
});

export default withXState(mapActionsToXState)(Light);
