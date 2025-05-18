const TaskTimer = ({
  onStartTimer,
  onStopTimer,
  task,
  remainingTime,
  formatTime,
}) => {
  return (
    <span className="timer">
      <button
        className="icon icon-play"
        onClick={onStartTimer}
        disabled={task.timerRunning || remainingTime === 0 || task.isCompleted}
      ></button>
      <button
        className="icon icon-pause"
        onClick={onStopTimer}
        disabled={!task.timerRunning}
      ></button>
      <p>{formatTime(remainingTime)}</p>
    </span>
  )
}

export default TaskTimer
