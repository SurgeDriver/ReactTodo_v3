import { useReducer, useState, useMemo, useCallback } from 'react'

const tasksReducer = (state, action) => {
  const updateTaskInArray = (taskId, updateFn) =>
    state.map((task) => (task.id === taskId ? updateFn(task) : task))

  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'EDIT_TASK':
      return updateTaskInArray(action.payload.id, (task) => ({
        ...task,
        body: action.payload.newText,
      }))
    case 'TOGGLE_COMPLETE_TASK':
      return updateTaskInArray(action.payload, (task) => ({
        ...task,
        isCompleted: !task.isCompleted,
        timerRunning: false,
      }))
    case 'START_TIMER':
      return updateTaskInArray(action.payload, (task) =>
        !task.timerRunning && task.remainingTime > 0
          ? { ...task, timerRunning: true, lastStartTime: Date.now() }
          : task
      )
    case 'STOP_TIMER':
      return updateTaskInArray(action.payload, (task) =>
        task.timerRunning
          ? {
              ...task,
              timerRunning: false,
              remainingTime:
                task.remainingTime -
                Math.floor((Date.now() - task.lastStartTime) / 1000),
            }
          : task
      )
    case 'CLEAR_COMPLETED':
      return state.filter((task) => !task.isCompleted)
    default:
      return state
  }
}

export const useTodo = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [filter, setFilter] = useState('all')

  const addNewTask = useCallback((taskText, totalSeconds) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: Date.now(),
        body: taskText,
        createdAt: Date.now(),
        isCompleted: false,
        timerRunning: false,
        initialTime: totalSeconds,
        remainingTime: totalSeconds,
        lastStartTime: null,
      },
    })
  }, [])

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }, [])

  const editTask = useCallback((id, newText) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, newText } })
  }, [])

  const toggleCompleteTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_COMPLETE_TASK', payload: id })
  }, [])

  const startTimer = useCallback((id) => {
    dispatch({ type: 'START_TIMER', payload: id })
  }, [])

  const stopTimer = useCallback((id) => {
    dispatch({ type: 'STOP_TIMER', payload: id })
  }, [])

  const clearCompletedTasks = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }, [])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.isCompleted)
    if (filter === 'completed') return tasks.filter((task) => task.isCompleted)
    return tasks
  }, [tasks, filter])

  const activeTasksCount = useMemo(
    () => tasks.filter((task) => !task.isCompleted).length,
    [tasks]
  )

  return {
    filteredTasks,
    activeTasksCount,
    filter,
    addNewTask,
    deleteTask,
    editTask,
    toggleCompleteTask,
    startTimer,
    stopTimer,
    clearCompletedTasks,
    handleFilterChange: setFilter,
  }
}
