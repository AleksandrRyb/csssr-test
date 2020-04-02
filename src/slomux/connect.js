import React from "react";
import PropTypes from "prop-types";

const connect = (
  mapStateToProps,
  mapDispatchToProps = () => {}
) => Component => {
  class WrappedComponent extends React.Component {
    render() {
      const { getState, dispatch } = this.context.store;

      return (
        <Component
          {...this.props}
          {...mapStateToProps(getState(), this.props)}
          {...mapDispatchToProps(dispatch, this.props)}
        />
      );
    }

    componentDidMount() {
      this.context.store.subscribe(this.handleChange);
    }

    handleChange = () => {
      this.forceUpdate();
    };
  }

  WrappedComponent.contextTypes = {
    store: PropTypes.object
  };

  return WrappedComponent;
};

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { store: this.props.store })
    );
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};

export { connect, Provider };
