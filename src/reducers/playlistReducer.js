// reducers/playlistReducer.js
import { ADD_VIDEO, CHANGE_INDEX, REMOVE_VIDEO, REORDER_PLAYLIST } from '../actions/types';
import {mediaJSON} from '../mediaJSON';

const initialState = {
  playlist: [mediaJSON.categories[0].videos],
  currentIndex:0
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };
    case REMOVE_VIDEO:
      return {
        ...state,
        playlist: state.playlist.filter((_, index) => index !== action.payload),
      };
    case REORDER_PLAYLIST:
      const { startIndex, endIndex } = action.payload;
      console.log("reorder")
      const reorderedPlaylist = Array.from(state.playlist);
      const [removed] = reorderedPlaylist.splice(startIndex, 1);
      reorderedPlaylist.splice(endIndex, 0, removed);
      return {
        ...state,
        playlist: reorderedPlaylist,
      };
      case CHANGE_INDEX:
        const { index } = action.payload;
        
        const currentIndex = index;
        console.log(currentIndex,"index change")

        
        return {
          ...state,
          currentIndex: currentIndex,
        };
    default:
      return state;
  }
};

export default playlistReducer;
