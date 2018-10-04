import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withXState = (mapActionsToXState) => (WrappedComponent) => {
  class WithXState extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    componentDidMount() {
      const { store: { dispatch } } = this.context;

      const machines = mapActionsToXState(dispatch);

      this._machines = Object.keys(machines).reduce((_machines, _machine) => {
        _machines[_machine] = {
          value: this.props[_machine].value,
          actions: machines[_machine]
        }

        return _machines;
      }, {});

      this._handleActions(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this._handleActions(nextProps);
    }

    _handleActions = async (props) => {
      for (let machine in this._machines) {
        if (machine in props) {
          let currentMachine = props[machine];
          if (currentMachine.actions && currentMachine.value !== this._machines[machine]['value']) {
            this._machines[machine].value = currentMachine.value;

            for (let action of props[machine]['actions']) {
              if (action.type in this._machines[machine]['actions']) {
                let currentAction = this._machines[machine]['actions'][action.type].call();

                if (currentAction && 'then' in currentAction) await currentAction;
              }
            }
          }
        }
      }
    }

    render() {
      return <WrappedComponent { ...this.props }/>
    }
  }

  WithXState.displayName = `WithXState(${getDisplayName(WrappedComponent)})`

  return WithXState;
}

export default withXState;