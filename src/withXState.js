import PropTypes from 'prop-types';
import React, { Component } from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withXState = mapActionsToXState => WrappedComponent => {
  class WithXState extends Component {
    static contextTypes = {
      store: PropTypes.object
    };

    componentDidMount() {
      this._formatMachines(this.props);
      this._handleActions(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this._formatMachines(nextProps);
      this._handleActions(nextProps);
    }

    _formatMachines = props => {
      let dispatch = fn => {
        fn();
      };

      if (
        'store' in this.context &&
        typeof this.context.store !== 'undefined'
      ) {
        dispatch = this.context.store.dispatch;
      }

      const machines = mapActionsToXState(dispatch, props);

      this._machines = Object.keys(machines).reduce((_machines, _machine) => {
        const previousValue =
          this._machines &&
          _machine in this._machines &&
          this._machines[_machine].value;

        _machines[_machine] = {
          value: previousValue ? previousValue : null,
          actions: machines[_machine]
        };

        return _machines;
      }, {});
    };

    _handleActions = async props => {
      for (let machine in this._machines) {
        if (machine in props) {
          let currentMachine = props[machine];
          if (
            currentMachine.actions &&
            currentMachine.value !== this._machines[machine]['value']
          ) {
            this._machines[machine].value = currentMachine.value;

            for (let action of props[machine]['actions']) {
              let currentAction = null;

              if (
                typeof action === 'string' &&
                action in this._machines[machine]['actions']
              ) {
                currentAction = this._machines[machine]['actions'][
                  action
                ].call();
              } else if (
                'type' in action &&
                action.type in this._machines[machine]['actions']
              ) {
                currentAction = this._machines[machine]['actions'][
                  action.type
                ].call();
              }

              if (currentAction && 'then' in currentAction) await currentAction;
            }
          }
        }
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithXState.displayName = `WithXState(${getDisplayName(WrappedComponent)})`;

  return WithXState;
};

export default withXState;
