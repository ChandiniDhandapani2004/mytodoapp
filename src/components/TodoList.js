
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

/**
 * TodoList component to manage and display the list of todos.
 */
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedTodoId, setExpandedTodoId] = useState(null); // New state for tracking expanded todo
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize search state from URL parameters
    const query = new URLSearchParams(location.search).get('search');
    setSearch(query || '');
  }, [location.search]);

  /**
   * Add a new todo item.
   * @param {Object} todo - The new todo object.
   */
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // Add the new todo with a unique id and current timestamp
    const newTodo = {
      ...todo,
      updatedAt: new Date().toISOString() // Add timestamp for new todos
    };
    setTodos([newTodo, ...todos]);
  };

  /**
   * Update an existing todo item.
   * @param {number} todoId - The id of the todo to update.
   * @param {Object} newValue - The updated todo object.
   */
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const updatedTodos = todos.map(item => 
      item.id === todoId 
      ? { ...item, text: newValue.text, updatedAt: new Date().toISOString() } // Update timestamp
      : item
    );
    setTodos(updatedTodos);
  };

  /**
   * Remove a todo item by id.
   * @param {number} id - The id of the todo to remove.
   */
  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * Toggle the completion status of a todo item.
   * @param {number} id - The id of the todo to toggle.
   */
  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  /**
   * Handle search input change.
   * @param {Object} e - The event object.
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`?search=${value}`);
  };

  // Filter todos based on search query
  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

  /**
   * Toggle the expanded state of a todo item.
   * @param {number} id - The id of the todo to toggle.
   */
  const handleExpand = (id) => {
    setExpandedTodoId(expandedTodoId === id ? null : id); // Toggle expand/collapse
  };

  return (
    <div>
      <h1>Welcome! What's the Plan for Today?</h1>
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        handleExpand={handleExpand} // Pass the function as a prop
        expandedTodoId={expandedTodoId} // Pass the expandedTodoId state
      />
    </div>
  );
}

export default TodoList;
