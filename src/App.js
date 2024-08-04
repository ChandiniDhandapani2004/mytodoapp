import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

/**
 * Main application component.
 */
function App() {
  return (
    <Router>
      <div className="todo-app">
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

