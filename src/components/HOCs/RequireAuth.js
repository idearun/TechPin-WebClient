import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount = () => {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate = (nextProps) => {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }



    render() {
      return (
        <div>
          {this.props.authenticated && <ComposedComponent {...this.props} />}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
