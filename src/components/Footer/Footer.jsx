import './Footer.scss'
import TaskFilter from '../TaskFilter/TaskFilter'

function Footer({
  onFilterChange,
  activeTasksCount,
  onClearCompleted,
  currentFilter,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <TaskFilter
        onFilterChange={onFilterChange}
        currentFilter={currentFilter}
      />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
