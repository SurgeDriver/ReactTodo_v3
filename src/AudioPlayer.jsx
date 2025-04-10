import React, { useRef } from 'react';
import YouTube from 'react-youtube';

export default function AudioPlayer() {
    const playerRef = useRef(null);

    // ID YouTube-видео (из URL: https://youtu.be/VIDEO_ID)
    const videoId = "dQw4w9WgXcQ"; // Замените на нужный ID

    const opts = {
        height: '0', // Скрываем видео (высота 0)
        width: '0',
        playerVars: {
            autoplay: 0, // Автовоспроизведение (0 - выкл, 1 - вкл)
            controls: 1, // Показывать элементы управления
        },
    };

    const onReady = (event) => {
        playerRef.current = event.target;
    };

    return (
        <div className="audio-player">
            <h3>YouTube Audio Player</h3>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
            />

            {/* Кнопки для управления (опционально) */}
            <div className="controls">
                <button onClick={() => playerRef.current.playVideo()}>▶️ Play</button>
                <button onClick={() => playerRef.current.pauseVideo()}>⏸ Pause</button>
            </div>
        </div>
    );
}