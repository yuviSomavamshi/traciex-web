import React, { Component, Fragment } from "react";
import withRouter from "app/WithRouter";
import { connect } from "react-redux";
import AppContext from "app/appContext";

class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: false,
      routes
    };
  }

  componentDidMount() {
    let user = localStorage.getItem("auth_user");
    if (user == null) {
    } else {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    let user = localStorage.getItem("auth_user");
    if (user == null) {
      this.props.history.push({
        pathname: "/login"
      });
    } else {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.authenticated !== this.state.authenticated;
  }

  static getDerivedStateFromProps(props, state) {
    const { location, user } = props;
    const { pathname } = location;
    const matched = state.routes.find((r) => r.path === pathname);
    const authenticated = matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;

    return {
      authenticated
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;
    history.push({
      pathname: pathname,
      state: { redirectUrl: pathname }
    });
  }

  render() {
    let { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = (state) => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
