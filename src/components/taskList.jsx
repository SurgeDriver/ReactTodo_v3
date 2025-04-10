// TaskList.js
import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

export default function TaskList({ tasks, onToggle, onDelete, formatDistanceToNow }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            formatDistanceToNow={formatDistanceToNow}
          />
        ))}
      </ul>
    </section>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  formatDistanceToNow: PropTypes.func.isRequired,
};
