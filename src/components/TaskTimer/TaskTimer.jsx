const PlayIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 14 14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M4.66669 2.91663V11.0833L11.0834 6.99996L4.66669 2.91663Z" />
  </svg>
)

const PauseIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 14 14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M4.08331 11.0833H5.83331V2.91663H4.08331V11.0833ZM8.16665 2.91663V11.0833H9.91665V2.91663H8.16665Z" />
  </svg>
)

const TaskTimer = ({
  onStartTimer,
  onStopTimer,
  task,
  remainingTime,
  formatTime,
}) => {
  if (task.initialTime === 0) {
    return null
  }

  return (
    <span className="timer">
      <button
        className="timer-button icon-play"
        onClick={onStartTimer}
        disabled={task.timerRunning || remainingTime === 0 || task.isCompleted}
        aria-label={`Start timer for task: ${task.body}`}
      >
        <PlayIcon />
      </button>
      <button
        className="timer-button icon-pause"
        onClick={onStopTimer}
        disabled={!task.timerRunning}
        aria-label={`Pause timer for task: ${task.body}`}
      >
        <PauseIcon />
      </button>
      <p>{formatTime(remainingTime)}</p>
    </span>
  )
}

export default TaskTimer
