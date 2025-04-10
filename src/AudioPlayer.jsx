import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';

export default function AudioPlayer() {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "R-XWfz3SbNk";

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
            controls: 0,
        },
    };

    const onReady = (event) => {
        playerRef.current = event.target;
    };

    const togglePlay = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="audio-player">
            <h3>Music</h3>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
            />

            <div className="controls">
                <button
                    onClick={togglePlay}
                    className={`play-button ${isPlaying ? 'playing' : ''}`}
                >
                    {isPlaying ? '⏸' : '▶️'}
                </button>
            </div>
        </div>
    );
}