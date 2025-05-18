import { useState, useEffect, useRef } from 'react'

import './Task.css'
import TaskTimer from '../TaskTimer/TaskTimer'

const Task = ({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
  onStartTimer,
  onStopTimer,
}) => {
  const [remainingTime, setRemainingTime] = useState(() => {
    if (task.timerRunning && task.lastStartTime) {
      const timePassed = Math.floor((Date.now() - task.lastStartTime) / 1000)
      return Math.max(0, task.remainingTime - timePassed)
    }
    return task.remainingTime
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.body)
  const inputRef = useRef(null)

  useEffect(() => {
    let interval
    if (task.timerRunning && task.remainingTime > 0) {
      interval = setInterval(() => {
        const now = Date.now()
        const timePassed = Math.floor((now - task.lastStartTime) / 1000)
        const newRemainingTime = Math.max(0, task.remainingTime - timePassed)
        setRemainingTime(newRemainingTime)
        if (newRemainingTime === 0) {
          onStopTimer()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [task.timerRunning, task.lastStartTime, task.remainingTime, onStopTimer])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEditing &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsEditing(false)
        setEditedText(task.body)
      }
    }

    const handleEscape = (event) => {
      if (isEditing && event.key === 'Escape') {
        setIsEditing(false)
        setEditedText(task.body)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isEditing, task.body])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleEditChange = (e) => {
    setEditedText(e.target.value)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editedText.trim()) {
      onEdit(task.createdAt, editedText)
      setIsEditing(false)
    }
  }

  const formatTime = (seconds) => {
    if (seconds === 0 && task.initialTime === 0) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <li
      className={`${task.isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.isCompleted}
          onChange={onToggleComplete}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="edit"
              value={editedText}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
        ) : (
          <label>
            <span className="description">{task.body}</span>
            <TaskTimer
              onStartTimer={onStartTimer}
              onStopTimer={onStopTimer}
              task={task}
              remainingTime={remainingTime}
              formatTime={formatTime}
            />
            <span className="created">
              created {Math.floor((Date.now() - task.createdAt) / 1000 / 60)}{' '}
              minutes ago
            </span>
          </label>
        )}
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="edit"
            value={editedText}
            onChange={handleEditChange}
            autoFocus
          />
        </form>
      )}
    </li>
  )
}

export default Task
