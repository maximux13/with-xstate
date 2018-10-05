import React from 'react';
import withXState from 'with-xstate';

const Light = ({ state }) => (
  <h1>
    Current: {state.value}
  </h1>
)

const mapActionsToXState = (dispatch) => ({
  state: {
    changeColor: () => {
      console.log('color changed!');
    }
  }
});

export default withXState(mapActionsToXState)(Light);
