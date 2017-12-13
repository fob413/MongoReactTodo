import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import shordit from 'shortid';
import { PropTypes } from 'prop-types';
import { loadTodos } from '../../actions/todo';
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
              <Todo todo={todo} key={shordit.generate()} />
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
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => (
  {
    todos: state.todos.todos
  }
);

export default connect(mapStateToProps, {
  loadTodos
})(withRouter(Todos));
