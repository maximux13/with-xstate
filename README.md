# (HOC) With XState


## Installation

```bash
npm install with-xstate
or
yarn add with-xstate
```

## Require

* [xstate](https://github.com/davidkpiano/xstate)

## Usage

In order to use `withXState` first pass the machine state through a prop to your component and then wrap it


### mapActionsToXState((dispatch) => {...})

takes a function that should return and object that contains a key, value pair, where each key is a machine state and its value should be another object that contain a key, value pair with the actions and the functions that should be execute once xstate added to the next state.

**NOTE** `mapActionsToXState` pass `dispatch` as optionally prop so you can dispatch redux actions in your state actions.

```js
import { Machine } from 'xstate';
import withXState from 'with-xstate';
import Component from './Component';

const toggleMachine = Machine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active',
        onEntry: ['fetchQuery']
      }
    },
    active: { on: { TOGGLE: 'inactive' } }
  }
});

const mapActionsToXState = () => ({
  'machineState': {
    fetchQuery: () => {
      console.log('fetch...')
    }
  }
});

const WithXStateComponent = withXState(mapActionsToXState)(Component);

<WithXStateComponent machineState={machine} />
```