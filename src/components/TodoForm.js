import React, { useState, useEffect, useRef } from 'react';

/**
 * TodoForm component for adding or editing todo items.
 */
function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    // Update input value if editing
    if (edit) {
      setInput(edit.value);
    }
  }, [edit]);

  /**
   * Handle input change.
   * @param {Object} e - The event object.
   */
  const handleChange = e => {
    setInput(e.target.value);
  };

  /**
   * Handle form submission.
   * @param {Object} e - The event object.
   */
  const handleSubmit = e => {
    e.preventDefault();
    if (!input) return;

    onSubmit({
      id: edit ? edit.id : Math.floor(Math.random() * 10000),
      text: input
    });

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
        type='text'
        placeholder={edit ? 'Update your item' : 'Add a task'}
        value={input}
        name='text'
        className='todo-input'
        onChange={handleChange}
        ref={inputRef}
      />
      <button className='todo-button'>
        {edit ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;

