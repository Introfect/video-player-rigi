import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import {mediaJSON} from './mediaJSON'; // Assuming you've stored JSON data in a separate file

const App = () => {
  const [playlist, setPlaylist] = useState(mediaJSON.categories[0].videos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div className='flex'>
      <VideoPlayer
        video={playlist[currentVideoIndex]}
        onNextVideo={handleNextVideo}
      />
      <Playlist
        videos={playlist}
        onSelectVideo={(video) => setCurrentVideoIndex(playlist.indexOf(video))}
        onReorder={(oldIndex, newIndex) => {
          const newPlaylist = [...playlist];
          const [removed] = newPlaylist.splice(oldIndex, 1);
          newPlaylist.splice(newIndex, 0, removed);
          setPlaylist(newPlaylist);
        }}
      />
    </div>
  );
};

export default App;
