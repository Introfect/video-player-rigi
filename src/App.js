import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import {mediaJSON} from './mediaJSON'; // Assuming you've stored JSON data in a separate file
import { useDispatch, useSelector } from 'react-redux';
import { reorderPlaylist } from './actions/playlistActions';

const App = () => {
  const selector=useSelector((state)=>state)
  console.log(selector,"select")
  const [playlist, setPlaylist] = useState(selector.playlist);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(selector.playlist.currentIndex);
  console.log(currentVideoIndex)
const dispatch=useDispatch();
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };
  useEffect(()=>{
setCurrentVideoIndex(selector.playlist.currentIndex)
  },[selector.playlist.currentIndex])

  return (
    <div className='h-screen'>
       <div className='flex h-80'>
       { console.log(playlist.playlist[0][currentVideoIndex],"ddm")}
       
      <VideoPlayer
        video={playlist.playlist[0][currentVideoIndex]}
        onNextVideo={handleNextVideo}
      />
      
      <Playlist
        playlist={playlist && playlist}
        onSelectVideo={(video) => setCurrentVideoIndex(playlist.indexOf(video))}
        onReorder={(oldIndex, newIndex) => {
          dispatch(reorderPlaylist(oldIndex,newIndex))
        }}
      />
    </div>

    </div>
   
  );
};

export default App;
