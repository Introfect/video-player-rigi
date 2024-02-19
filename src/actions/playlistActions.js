// actions/playlistActions.js
import { ADD_VIDEO, CHANGE_INDEX, REMOVE_VIDEO, REORDER_PLAYLIST } from './types';

export const addVideo = (video) => ({
  type: ADD_VIDEO,
  payload: video,
});

export const removeVideo = (index) => ({
  type: REMOVE_VIDEO,
  payload: index,
});

export const reorderPlaylist = (playlist) => ({
  type: REORDER_PLAYLIST,
  payload: { playlist },
});
export const changeIndex = (index) => ({
  type: CHANGE_INDEX,
  payload: { index },
});
