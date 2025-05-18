import { useState } from 'react'
import './NewTaskForm.css'

function NewTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleInputChange = (e) => {
    setTaskText(e.target.value)
  }

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskText.trim()) {
      const totalSeconds =
        (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
      onAddTask(taskText, totalSeconds)
      setTaskText('')
      setMinutes('')
      setSeconds('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={taskText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={handleMinutesChange}
        onKeyDown={handleKeyDown}
        type="number"
        min="0"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={handleSecondsChange}
        onKeyDown={handleKeyDown}
        type="number"
        min="0"
        max="59"
      />
    </form>
  )
}

export default NewTaskForm
