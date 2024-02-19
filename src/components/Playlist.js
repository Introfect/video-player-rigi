// components/Playlist.js
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { changeIndex, removeVideo, reorderPlaylist } from '../actions/playlistActions';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Playlist = ({ playlist, removeVideo }) => {
  const dispatch=useDispatch()

  const handleRemoveVideo = (index) => {
    removeVideo(index);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = (result) => {
    console.log(result,"re")
    if (!result.destination) return;
    const newItems = Array.from(playlist);
    console.log(newItems,"jdnj")
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    newItems && console.log(newItems,"jjj")
    dispatch(reorderPlaylist(newItems))

  };

  return (
    <div>
      <h2>Playlist</h2>
      <div>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
      {playlist && playlist.map((video, index) => {
         
          return( 
            <Draggable key={video.id} draggableId={video.id} index={index}> 
            
              {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='my-2 bg-green-500 '
            draggable 
            index={index}
            id={index}
            onDragStart={(e) => handleDragStart(e, index)} 
            
            // onDrop={(e) => handleDrop(e, index)}
            onClick={()=>dispatch(changeIndex(index))}>
            {video.title}
            </div>
              )}
            
            </Draggable>)     
})}
{provided.placeholder}

      </div>
        )}
        </Droppable>
        </DragDropContext>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.playlist.playlist,
});

export default connect(mapStateToProps, { removeVideo, reorderPlaylist })(Playlist);
