import { Machine } from 'xstate';
import { combineReducers } from 'redux';

export const TIMER = '@withxState/TIMER';

const lightMachine = Machine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        [TIMER]: 'yellow'
      },
      onEntry: ['changeColor'],
      onExit: ['bye']
    },
    yellow: {
      on: {
        [TIMER]: 'red'
      },
      onEntry: ['changeColor']
    },
    red: {
      on: {
        [TIMER]: 'green'
      },
      onEntry: ['changeColor']
    }
  }
});

const machineReducer = (state = lightMachine.initialState, action) => {
  switch (action.type) {
    case TIMER:
      const { type, payload } = action;

      const nextState = lightMachine.transition(state, type, payload);

      return nextState;
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  machine: machineReducer
});

export default rootReducers;
