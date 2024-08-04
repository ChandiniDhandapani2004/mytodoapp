import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'; // For expand/collapse icons
import TodoForm from './TodoForm';

/**
 * Todo component to display individual todo items.
 */
function Todo({ todos, completeTodo, removeTodo, updateTodo, handleExpand, expandedTodoId }) {
  const [edit, setEdit] = React.useState({
    id: null,
    value: ''
  });

  /**
   * Submit the updated todo value.
   * @param {Object} value - The updated todo object.
   */
  const submitUpdate = value => {
    if (edit.id) {
      updateTodo(edit.id, value);
      setEdit({
        id: null,
        value: ''
      });
    }
  };

  // If in edit mode, render TodoForm for updating
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map(todo => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <div className="todo-text" onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
        <div className="expand-icon" onClick={() => handleExpand(todo.id)}>
          {expandedTodoId === todo.id ? <BiUpArrow /> : <BiDownArrow />}
        </div>
      </div>
      {expandedTodoId === todo.id && (
        <div className="todo-details">
          <p>Description: {todo.text}</p>
          <p>Last Updated: {new Date(todo.updatedAt).toLocaleString()}</p> {/* Display the last updated date */}
        </div>
      )}
    </div>
  ));
}

export default Todo;

