import { useState, useRef } from 'react'
import './NewTaskForm.scss'

const INITIAL_STATE = {
  taskText: '',
  minutes: '',
  seconds: '',
}

function NewTaskForm({ onAddTask }) {
  const [formState, setFormState] = useState(INITIAL_STATE)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { taskText, minutes, seconds } = formState

    if (taskText.trim()) {
      const totalSeconds =
        (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0)
      onAddTask(taskText, totalSeconds)
      setFormState(INITIAL_STATE)
      inputRef.current?.focus()
    }
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        name="taskText"
        className="new-todo"
        placeholder="What needs to be done?"
        value={formState.taskText}
        onChange={handleChange}
        autoFocus
      />
      <input
        name="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        value={formState.minutes}
        onChange={handleChange}
        type="number"
        min="0"
        max="999"
      />
      <input
        name="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={formState.seconds}
        onChange={handleChange}
        type="number"
        min="0"
        max="59"
      />
      <button type="submit" style={{ display: 'none' }} aria-label="Add task" />
    </form>
  )
}

export default NewTaskForm
