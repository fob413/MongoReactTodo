import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signupUser } from '../../actions/authentication';

/**
 * @export
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {
  /**
   * Creates an instance of Signup.
   * @param {any} props
   * @memberof Signup
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
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
    this.props.signupUser(this.state).then((response) => {
      response.success && this.props.history.push('/dashboard');
    });
  }

  /**
   * @returns
   * @memberof Signup
   * @return {void}
   */
  render() {
    return (
      <form className="col s10 m12" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons orange-text prefix">account_circle</i>
            <input
              id="icon_prefix"
              type="text"
              className="validate"
              name="username"
              onChange={this.onChange}
              value={this.state.username}
              autoComplete="off"
              required
            />
            <label htmlFor="icon_prefix">UserName</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons orange-text prefix">mail</i>
            <input
              id="icon_prefix"
              type="text"
              className="validate"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              autoComplete="off"
              required
            />
            <label htmlFor="icon_prefix">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons orange-text prefix">lock</i>
            <input
              id="icon_prefix"
              type="password"
              className="validate"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              autoComplete="off"
              required
            />
            <label htmlFor="icon_prefix">Password</label>
          </div>
        </div>
        <div className="row center">
          <button className="waves-effect indigo darken-4 waves-light btn">SIGN-UP</button>
        </div>
      </form>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, {
  signupUser
})(withRouter(Signup));
