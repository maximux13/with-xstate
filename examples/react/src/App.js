import { Machine } from 'xstate';
import React, { Component } from 'react';

import Light from './Light';

const lightMachine = Machine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      },
      onEntry: ['changeColor']
    },
    yellow: {
      on: {
        TIMER: 'red'
      },
      onEntry: ['changeColor']
    },
    red: {
      on: {
        TIMER: 'green'
      },
      onEntry: ['changeColor']
    }
  }
});

class App extends Component {
  state = {
    machine: lightMachine.initialState
  };

  switchLight = () => {
    this.setState({
      machine: lightMachine.transition(this.state.machine, 'TIMER')
    });
  };

  render() {
    return (
      <div>
        <h1>withXState</h1>
        <Light state={this.state.machine} />
        <button onClick={this.switchLight}>Change</button>
      </div>
    );
  }
}

export default App;
