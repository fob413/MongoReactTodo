import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';

/**
 * @export
 * @class SignUp
 * @extends {React.Component}
 */
export class Home extends React.Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      signup: true
    };
    this.toggleSignup = this.toggleSignup.bind(this);
  }

  /**
   * toggle between sign up and signin
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  toggleSignup(event) {
    event.preventDefault();
    this.setState({
      signup: !this.state.signup
    });
  }

  /**
   * @memberof SignUp
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 l4 center">
            <img
              src="http://res.cloudinary.com/dha1rdetk/image/upload/v1512748232/todoLogo_wnfaji.png"
              alt="Todo logo"
              width="50%"
            />
          </div>
          <div className="col s12 l8 signForm">
            <div className="row">
              <div className="col center s6">
                <p
                  onClick={this.toggleSignup}
                  className={this.state.signup ? 'authentication selected' : 'authentication'}
                >
                  SIGNUP
                </p>
              </div>
              <div className="col center s6">
                <p
                  onClick={this.toggleSignup}
                  className={!this.state.signup ? 'authentication selected' : 'authentication'}
                >
                  LOGIN
                </p>
              </div>
            </div>
            <div className="col s1 m0" />
            {this.state.signup ?
              <Signup signup={this.state.signup} /> :
              <Signin signup={this.state.signup} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
