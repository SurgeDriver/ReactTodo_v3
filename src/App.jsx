import { useState } from 'react'
import './App.css'
import YouTube from 'react-youtube';
import './AudioPlayer.css'; // Добавьте эту строку
import AudioPlayer from './AudioPlayer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Blank</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Fuck you.
        </p>
      </div>
      <AudioPlayer/>
    </>
  )
}

export default App
