import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import { useTodo } from '../hooks/useTodo'

function App() {
  const {
    filteredTasks,
    activeTasksCount,
    addNewTask,
    deleteTask,
    editTask,
    toggleCompleteTask,
    startTimer,
    stopTimer,
    clearCompletedTasks,
    handleFilterChange,
  } = useTodo()

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addNewTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleCompleteTask={toggleCompleteTask}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          onFilterChange={handleFilterChange}
          activeTasksCount={activeTasksCount}
          onClearCompleted={clearCompletedTasks}
        />
      </section>
    </section>
  )
}

export default App
