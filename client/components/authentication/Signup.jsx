import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * @export
 * @class SignUp
 * @extends {React.Component}
 */
export class SignUp extends React.Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  /**
   * @memberof SignUp
   * @return {void}
   */
  render() {
    return (
      <div>
        oya sign up
      </div>
    );
  }
}

export default SignUp;
