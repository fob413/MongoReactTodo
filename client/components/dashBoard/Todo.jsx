import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * @export
 * @class Todo
 * @extends {React.Component}
 */
export class Todo extends React.Component {
  /**
   * Creates an instance of Todo.
   * @param {any} props
   * @memberof Todo
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  /**
   * complete a todo
   * @param {any} event
   * @memberof Todo
   * @return {void}
   */
  completeTodo(event) {
    event.preventDefault();
    this.props.completeTodo(this.props.todo._id);
  }

  /**
   * delete a todo
   * @param {any} event
   * @memberof Todo
   * @return {void}
   */
  deleteTodo(event) {
    event.preventDefault();
    this.props.deleteTodo(this.props.todo._id);
  }

  /**
   * @returns
   * @memberof Todo
   * @return {void}
   */
  render() {
    return (
      <div className="todos">
        <div className="col s2">
          <i className="material-icons right indigo-text">label_outline</i>
        </div>
        <div className="col s8">
          <p>{this.props.todo.title}</p>
          <p>{this.props.todo.description}</p>
        </div>
        <div className="col s2">
          <div className="row">
            <div className="col 12">
              {!this.props.todo.completed ?
                <i onClick={this.completeTodo} className="material-icons indigo-text">
                  crop_3_2
                </i> :
                <i className="material-icons indigo-text">done</i>
              }
            </div>
          </div>
          <div className="row">
            <div className="col 12">
              <i onClick={this.deleteTodo} className="material-icons red-text">delete</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default Todo;

