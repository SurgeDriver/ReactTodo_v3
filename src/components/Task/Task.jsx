/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef } from 'react'

//
import './Task.scss'
import TaskTimer from '../TaskTimer/TaskTimer'
import useTimer from '../hooks/useTimer'
import formatTime from '../utils/formatTime'

const Task = ({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
  onStartTimer,
  onStopTimer,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.body)
  const inputRef = useRef(null)
  const remainingTime = useTimer(task, onStopTimer)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    const newText = editedText.trim()
    if (newText) onEdit(task.id, newText)
    setIsEditing(false)
  }

  useEffect(() => {
    if (!isEditing) {
      return
    }

    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleSubmit()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, handleSubmit])
  const handleEdit = () => {
    if (task.isCompleted) return
    setEditedText(task.body)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const taskClasses = `${task.isCompleted ? 'completed' : ''} ${
    isEditing ? 'editing' : ''
  }`

  return (
    <li className={taskClasses}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form-container">
          <input
            ref={inputRef}
            type="text"
            className="edit"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={task.isCompleted}
            onChange={onToggleComplete}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`} className="checkbox-label" />

          <div className="task-content-wrapper">
            <span className="description" onDoubleClick={handleEdit}>
              {task.body}
            </span>
            <TaskTimer
              onStartTimer={onStartTimer}
              onStopTimer={onStopTimer}
              task={task}
              remainingTime={remainingTime}
              formatTime={formatTime}
            />
            <span className="created">
              created <br />
              {Math.floor((Date.now() - task.createdAt) / 60000)} minutes ago
            </span>
          </div>
          <button
            className="icon icon-edit"
            onClick={handleEdit}
            aria-label="Edit task"
            disabled={task.isCompleted}
          />
          <button
            className="icon icon-destroy"
            onClick={onDelete}
            aria-label="Delete task"
          />
        </div>
      )}
    </li>
  )
}

export default Task
