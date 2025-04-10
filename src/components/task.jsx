// Task.js
import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task, onToggle, onDelete, formatDistanceToNow }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label>
          <span className="description">{task.text}</span>
          <span className="created">
            created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
          </span>
        </label>
        <button className="icon icon-destroy" onClick={() => onDelete(task.id)} />
      </div>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  formatDistanceToNow: PropTypes.func.isRequired,
};
