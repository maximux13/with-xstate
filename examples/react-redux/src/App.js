import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";

import { changeLight } from "./store/actions";
import Light from "./Light";

class App extends Component {
  render() {
    return (
      <div>
        <h1>withXState</h1>
        <Light />
        <button onClick={this.props.changeLight}>Change</button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeLight
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
