// components/Playlist.js
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeIndex, removeVideo, reorderPlaylist } from '../actions/playlistActions';


const Playlist = ({ playlist, removeVideo }) => {
  const handleRemoveVideo = (index) => {
    removeVideo(index);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = e.dataTransfer.getData('index');
    reorderPlaylist(parseInt(oldIndex), newIndex);
  };
  const dispatch=useDispatch()

  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {playlist &&playlist[0] && playlist[0].map((video, index) => {
          return(
            <li 
            className='my-4'
            key={index} 
            draggable onDragStart={(e) => handleDragStart(e, index)} 
            onDragOver={handleDragOver} 
            onDrop={(e) => handleDrop(e, index)}
            onClick={()=>dispatch(changeIndex(index))}>
            {video.title}
            <button onClick={() => handleRemoveVideo(index)}>Remove</button>
          </li>

          )
       
})}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.playlist.playlist,
});

export default connect(mapStateToProps, { removeVideo, reorderPlaylist })(Playlist);
