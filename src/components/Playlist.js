import React from 'react';

const Playlist = ({ videos, onSelectVideo, onReorder }) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = e.dataTransfer.getData('index');
    onReorder(parseInt(oldIndex), newIndex);
  };

  return (
    <div className='overflow-x-auto space-x-3'>
      {videos.map((video, index) => (
        <div
        className='min-w-40 bg-white text-black rounded-md overflow-hidden'
        onClick={() => onSelectVideo(video)}
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <img src={video.thumb} alt={video.title} />
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
