import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * @export
 * @class Todo
 * @param {any} props
 * @extends {React.Component}
 */
export const Todo = props => (
  <div className="todos">
    <div className="col s2">
      <i className="material-icons right indigo-text">label_outline</i>
    </div>
    <div className="col s8">
      <p>{props.todo.title}</p>
      <p>{props.todo.description}</p>
    </div>
    <div className="col s2">
      <div className="row">
        <div className="col 12">
          {!props.todo.completed ?
            <i className="material-icons indigo-text">crop_3_2</i> :
            <i className="material-icons indigo-text">done</i>
          }
        </div>
      </div>
      <div className="row">
        <div className="col 12">
          <i className="material-icons red-text">delete</i>
        </div>
      </div>
    </div>
  </div>
);

Todo.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Todo;

