import { useReducer } from 'react'

const initialState = {
  tasks: [],
  filter: 'all',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, body: action.payload.newText }
            : task
        ),
      }
    case 'TOGGLE_COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                isCompleted: !task.isCompleted,
                timerRunning: false,
                remainingTime: !task.isCompleted
                  ? task.initialTime
                  : task.remainingTime,
                lastStartTime: null,
              }
            : task
        ),
      }
    case 'START_TIMER':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload &&
          !task.timerRunning &&
          task.remainingTime > 0
            ? {
                ...task,
                timerRunning: true,
                lastStartTime: Date.now(),
              }
            : task
        ),
      }
    case 'STOP_TIMER':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload && task.timerRunning
            ? {
                ...task,
                timerRunning: false,
                remainingTime:
                  task.remainingTime -
                  Math.floor((Date.now() - task.lastStartTime) / 1000),
                lastStartTime: null,
              }
            : task
        ),
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.isCompleted),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}

export const useTodo = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addNewTask = (taskText, totalSeconds) => {
    const newTask = {
      id: Date.now(),
      body: taskText,
      createdAt: Date.now(),
      isCompleted: false,
      timerRunning: false,
      initialTime: totalSeconds,
      remainingTime: totalSeconds,
      lastStartTime: null,
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  const editTask = (id, newText) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, newText } })
  }

  const toggleCompleteTask = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE_TASK', payload: id })
  }

  const startTimer = (id) => {
    dispatch({ type: 'START_TIMER', payload: id })
  }

  const stopTimer = (id) => {
    dispatch({ type: 'STOP_TIMER', payload: id })
  }

  const clearCompletedTasks = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const handleFilterChange = (newFilter) => {
    dispatch({ type: 'SET_FILTER', payload: newFilter })
  }

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'all') return true
    if (state.filter === 'active') return !task.isCompleted
    if (state.filter === 'completed') return task.isCompleted
    return true
  })

  const activeTasksCount = state.tasks.filter(
    (task) => !task.isCompleted
  ).length

  return {
    tasks: state.tasks,
    filteredTasks,
    activeTasksCount,
    filter: state.filter,
    addNewTask,
    deleteTask,
    editTask,
    toggleCompleteTask,
    startTimer,
    stopTimer,
    clearCompletedTasks,
    handleFilterChange,
  }
}
