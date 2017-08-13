import React from 'react';
import { connect } from 'react-redux';
import { signIn, resetErrorLog, resetRedirect, verifyToken } from '../../actions';
import NotificationSystem from 'react-notification-system';
import SignInForm from './partials/SignInForm.jsx';
import Footer from './partials/Footer.jsx';

class Index extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const redirect = this.props.apiError.redirect;
    if (redirect.yes) {
      this.props.resetRedirect();
      // window.location = redirect.to;
    }
    return (
      <div>
        <Body store={this.props}/>
      </div>
    );
  }
}

/**
 * React componet that displays Navigation Bar
 */
class NavBar extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4" role="navigation">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
            <a href="#" data-activates="mobile-demo"
              className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="#">About PostIt</a></li>
            </ul>
            <ul id="mobile-demo" className="side-nav">
              <li>
                <div className="user-details">
                  <div className="background">
                    <img src="images/fire2.png" />
                  </div>
                </div>
              </li>
              <li><a href="#"><i className="large material-icons black-text">info</i>
                About PostIt</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


/**
 * React component for displaying page body
 */
class Body extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="body">
        <NavBar/>
        <div id="main">
          <div className="fixed-action-btn hide-on-med-and-up">
            <a className="btn-floating btn-large red" href="#signinform">
              <i className="large material-icons">lock_outline</i>
            </a>
          </div>

          <div className="transparent-body">
            <div className="row">
              <div className="col s12 m6 l7 center">
                <h3 className="brown-text accent-4\
                  lighten-3 center">Why meet when you can PostIt?</h3>
                <div className="row">
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">people</i>
                    <h6 className="brown-text accent-4">Create teams of all sizes</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">perm_scan_wifi</i>
                    <h6 className="brown-text accent-4">Send broadcast messages to team members</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">done_all</i>
                    <h6 className="brown-text accent-4">Get receipt notifications</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">trending_up</i>
                    <h6 className="brown-text accent-4">Achieve more in less time</h6>
                  </div>
                </div>
              </div>
              <SignInForm store={this.props.store}/>
            </div>
          </div>

        </div>
      <Footer/>
    </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    }
  });


const mapDispatchToProps = dispatch =>
  ({
    signIn: (email, password) => dispatch(signIn(email, password)),
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetRedirect: () => dispatch(resetRedirect()),
    verifyToken: token => dispatch(verifyToken(token))
  });


export default connect(mapStateToProps, mapDispatchToProps)(Index);
