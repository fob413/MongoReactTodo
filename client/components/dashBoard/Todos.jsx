import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import shordit from 'shortid';
import { PropTypes } from 'prop-types';
import { loadTodos, deleteTodo, completeTodo } from '../../actions/todo';
import Todo from './Todo';

/**
 * @export
 * @class Todos
 * @extends {React.Component}
 */
export class Todos extends React.Component {
  /**
   * Creates an instance of Todos.
   * @param {any} props
   * @memberof Todos
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: this.props.todos
    };

    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  /**
   * @memberof Todos
   * @return {void}
   */
  componentDidMount() {
    this.props.loadTodos();
  }

  /**
   * @param {any} nextProps
   * @memberof Todos
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.todos
    });
  }

  /**
   * finish up a todo
   * @memberof Todos
   * @param {any} id
   * @return {void}
   */
  completeTodo(id) {
    const todoId = {
      todoId: id
    };
    this.props.completeTodo(todoId).then(() => {
      this.props.loadTodos();
    });
  }

  /**
   * delete a users todo
   * @memberof Todos
   * @param {any} id
   * @return {void}
   */
  deleteTodo(id) {
    const todoId = {
      todoId: id
    };
    this.props.deleteTodo(todoId).then(() => {
      this.props.loadTodos();
    });
    this.props.loadTodos();
  }

  /**
   * @returns
   * @memberof Todos
   * @return {void}
   */
  render() {
    return (
      this.state.todos.length > 0 ?
        <div className="">
          <div className="row todoList">
            {this.state.todos.map(todo => (
              <Todo
                todo={todo}
                key={shordit.generate()}
                completeTodo={this.completeTodo}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </div>
        </div> :
        <div>
          <h5 className="center">CREATE YOUR FIRST TODO</h5>
        </div>
    );
  }
}

Todos.propTypes = {
  loadTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    todos: state.todos.todos
  }
);

export default connect(mapStateToProps, {
  loadTodos,
  completeTodo,
  deleteTodo
})(withRouter(Todos));
