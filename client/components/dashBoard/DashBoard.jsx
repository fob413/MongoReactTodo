import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { signoutUser } from '../../actions/authentication';
import CreateTodo from './CreateTodo';
import Todos from './Todos';

/**
 * @export
 * @class DashBoard
 * @extends {React.Component}
 */
export class DashBoard extends React.Component {
  /**
   * Creates an instance of DashBoard.
   * @param {any} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);

    this.state = {
      todoName: '',
      modalIsOpen: false
    };

    this.onSignOut = this.onSignOut.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * @param {any} event user click event
   * @memberof DashBoard
   * @return {void}
   */
  onSignOut(event) {
    event.preventDefault();
    this.props.signoutUser();
    this.props.history.push('/');
  }

  /**
   * @memberof DashBoard
   * @return {void}
   */
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  /**
   * @memberof DashBoard
   * @return {void}
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  /**
   * @returns
   * @memberof DashBoard
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <div className="row dashNav">
          <div className="col s6">
            <img
              src="http://res.cloudinary.com/dha1rdetk/image/upload/v1512748232/todoLogo_wnfaji.png"
              alt="Todo Logo"
              height="80vh"
              className="left"
            />
          </div>
          <div className="col s6 right">
            <a
              className="btn-floating btn-large waves-effect waves-light orange right"
              onClick={this.onSignOut}
            >
              <i className="material-icons">power_settings_new</i>
            </a>
          </div>
        </div>

        <Todos />
        <a className="btn-floating btn-large waves-effect waves-light orange todoButton">
          <i onClick={this.openModal} className="material-icons">add</i>
        </a>
        <CreateTodo
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

DashBoard.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, {
  signoutUser
})(withRouter(DashBoard));
