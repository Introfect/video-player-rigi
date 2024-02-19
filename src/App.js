import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const selector=useSelector((state)=>state)
  console.log(selector,"select")
  const [playlist, setPlaylist] = useState(selector.playlist);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(selector.playlist.currentIndex);
  console.log(currentVideoIndex)
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };
  useEffect(()=>{
setCurrentVideoIndex(selector.playlist.currentIndex)
setPlaylist(selector.playlist)
  },[selector.playlist])

  return (
    <div className='h-screen bg-black'>
       <div className='flex h-80'>
      
       
      <VideoPlayer
        video={playlist.playlist[currentVideoIndex]}
        onNextVideo={handleNextVideo}
      />
      <div>
      <Playlist
        playlist={playlist && playlist}
        onSelectVideo={(video) => setCurrentVideoIndex(playlist.indexOf(video))}
        
      />

      </div>
      
    </div>

    </div>
   
  );
};

export default App;
