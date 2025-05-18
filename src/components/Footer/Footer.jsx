import './Footer.css'
import TaskFilter from '../TaskFilter/TaskFilter'

function Footer({ onFilterChange, activeTasksCount, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <TaskFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
