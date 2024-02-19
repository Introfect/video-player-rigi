// components/VideoPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { removeVideo, reorderPlaylist } from '../actions/playlistActions';

const VideoPlayer = ({ video, playlist, onNextVideo, removeVideo, reorderPlaylist }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleProgress = () => {
      setPlayedSeconds(videoElement.currentTime);
    };
    const handleEnded = () => {
      const currentIndex = playlist.findIndex(v => v === video);
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        // Play the next video in the playlist
        onNextVideo(playlist[currentIndex + 1]);
      }
    };
    videoElement.addEventListener('timeupdate', handleProgress);
    videoElement.addEventListener('ended', handleEnded);
    return () => {
      videoElement.removeEventListener('timeupdate', handleProgress);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [video, playlist, onNextVideo]);

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
      {console.log(video,"vd")}
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

const mapStateToProps = (state) => ({
  playlist: state.playlist.playlist,
});

export default connect(mapStateToProps, { removeVideo, reorderPlaylist })(VideoPlayer);
