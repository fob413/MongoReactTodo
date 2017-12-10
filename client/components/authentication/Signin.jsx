import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signinUser } from '../../actions/authentication';

/**
 * @export
 * @class Signin
 * @extends {React.Component}
 * @return {void}
 */
export class Signin extends React.Component {
  /**
   * Creates an instance of Signin.
   * @param {any} props
   * @memberof Signin
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   * @memberof Signin
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * form submit function
   * @param {any} event
   * @memberof Signin
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state).then((response) => {
      response.success && this.props.history.push('/dashboard')
    });
  }

  /**
   * @returns
   * @memberof Signin
   * @return {void}
   */
  render() {
    return (
      <form className="col s12" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons orange-text prefix">account_circle</i>
            <input
              value={this.state.username}
              id="icon_prefix"
              type="text"
              className="validate"
              onChange={this.onChange}
              name="username"
              autoComplete="off"
              required
            />
            <label htmlFor="icon_prefix">UserName</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons orange-text prefix">lock</i>
            <input
              value={this.state.password}
              id="icon_prefix"
              type="password"
              className="validate"
              onChange={this.onChange}
              name="password"
              autoComplete="off"
              required
            />
            <label htmlFor="icon_prefix">Password</label>
          </div>
        </div>
        <div className="row center">
          <button className="waves-effect indigo darken-4 waves-light btn">Login</button>
        </div>
        <p className="forgot center">Forgot Password?</p>
      </form>
    );
  }
}

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, {
  signinUser
})(withRouter(Signin));
