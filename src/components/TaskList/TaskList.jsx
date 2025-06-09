import './TaskList.scss'
import Task from '../Task/Task'

function TaskList({
  tasks,
  onDeleteTask,
  onEditTask,
  onToggleCompleteTask,
  onStartTimer,
  onStopTimer,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={onEditTask}
          onToggleComplete={() => onToggleCompleteTask(task.id)}
          onStartTimer={() => onStartTimer(task.id)}
          onStopTimer={() => onStopTimer(task.id)}
        />
      ))}
    </ul>
  )
}

export default TaskList
