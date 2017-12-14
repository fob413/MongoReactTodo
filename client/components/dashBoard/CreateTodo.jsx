import React from 'react';
import Modal from 'react-modal';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTodo, loadTodos } from '../../actions/todo';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

/**
 * @export
 * @class CreateTodo
 * @extends {React.Component}
 */
export class CreateTodo extends React.Component {
  /**
   * Creates an instance of CreateTodo.
   * @param {any} props
   * @memberof CreateTodo
   */
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: this.props.modalIsOpen,
      title: '',
      description: ''
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} nextProps
   * @memberof CreateTodo
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      modalIsOpen: nextProps.modalIsOpen
    });
  }

  /**
   * @param {any} event
   * @memberof CreateTodo
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * submit form
   * @param {any} event
   * @memberof CreateTodo
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createTodo(this.state)
      .then(() => {
        this.props.closeModal();
        this.props.loadTodos();
      });
  }

  /**
   * @memberof CreateTodo
   * @return {void}
   */
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
    this.subtitle.style.fontWeight = 'bold';
  }

  /**
   * @returns
   * @memberof CreateTodo
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >

          <div className="row">
            <div className="col s10">
              <h5 ref={subtitle => this.subtitle = subtitle}>Create Todo</h5>
            </div>
            <div className="col s2">
              <i onClick={this.props.closeModal} className="material-icons right close red-text">close</i>
            </div>
          </div>
          <div className="row">
            <form className="col s12 newTodo" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Title"
                    id="title"
                    autoComplete="off"
                    type="text"
                    className="validate"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    autoComplete="off"
                    className="materialize-textarea"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div className="col s12">
                  <a onClick={this.onSubmit} className="waves-effect waves-light btn right orange black-text">
                    create
                  </a>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

CreateTodo.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  loadTodos: PropTypes.func.isRequired
};

export default connect(null, {
  createTodo,
  loadTodos
})(withRouter(CreateTodo));

