import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer = ({ video, onNextVideo }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleProgress = () => {
      setPlayedSeconds(videoElement.currentTime);
    };
    const handleEnded = () => {
      onNextVideo();
    };
    videoElement.addEventListener('timeupdate', handleProgress);
    videoElement.addEventListener('ended', handleEnded);
    return () => {
      videoElement.removeEventListener('timeupdate', handleProgress);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [video, onNextVideo]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.play().catch(error => {
        // Handle error gracefully, if needed
        console.error('Failed to play the video:', error);
      });
    } else {
      videoElement.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSeek = (time) => {
    videoRef.current.currentTime = time;
    setPlayedSeconds(time);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={video.sources[0]}
        controls
        width="100%"
        height="auto"
      ></video>
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={video.duration}
          value={playedSeconds}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
        />
        <span>{playedSeconds.toFixed(2)}</span>
        <select>
          <option value="1">Normal</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
