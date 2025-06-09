import './TaskFilter.scss'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

function TaskFilter({ onFilterChange, currentFilter }) {
  return (
    <ul className="filters">
      {FILTERS.map(({ label, value }) => (
        <li key={value}>
          <button
            className={currentFilter === value ? 'selected' : ''}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskFilter
