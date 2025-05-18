import { useState } from 'react'
import './TaskFilter.css'

function TaskFilter({ onFilterChange }) {
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    onFilterChange(newFilter)
  }

  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
