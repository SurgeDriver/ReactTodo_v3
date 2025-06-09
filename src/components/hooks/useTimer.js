import { useState, useEffect } from 'react'

const useTaskTimer = (task, onStopTimer) => {
  const [remainingTime, setRemainingTime] = useState(task.remainingTime)

  useEffect(() => {
    if (!task.timerRunning) {
      setRemainingTime(task.remainingTime)
      return undefined
    }

    const calculateRemaining = () => {
      const timePassed = Math.floor((Date.now() - task.lastStartTime) / 1000)
      return Math.max(0, task.remainingTime - timePassed)
    }

    setRemainingTime(calculateRemaining())

    const interval = setInterval(() => {
      const newTime = calculateRemaining()
      setRemainingTime(newTime)
      if (newTime === 0) {
        onStopTimer()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [task.timerRunning, task.lastStartTime, task.remainingTime, onStopTimer])

  return remainingTime
}

export default useTaskTimer
