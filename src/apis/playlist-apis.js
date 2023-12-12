import axios from 'axios';
import {PROXY_CLOUD, PROXY_TUE_LOCAL} from '@env';

export const GETAllPlaylistByUser = async token => {
  var url = PROXY_TUE_LOCAL + '/api/v1/playlist/get-all-playlist';
  const {data} = await axios({
    method: 'get',
    url: url,
    validateStatus: () => true,
    headers: {
      authorization: 'Bearer ' + token,
    },
  });
  console.log(data);
  return data;
};

export const POSTCreatePlaylist = async playlistname => {
  var url = PROXY_TUE_LOCAL + '/api/v1/playlist/create-playlist';
  const {data} = await axios({
    method: 'post',
    url: url,
    validateStatus: () => true,
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: {playlistname},
  });
  return data;
};

export const POSTAddVideoToPlaylistAction = async (
  videoID,
  token,
  playlistID,
) => {
  var url = PROXY_TUE_LOCAL + '/api/v1/playlist/add-playlist/' + videoID;
  const {data} = await axios({
    method: 'post',
    url: url,
    validateStatus: () => true,
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: {playlistID},
  });
  return data;
};

const playlistAPIs = {
  POSTAddVideoToPlaylistAction,
  GETAllPlaylistByUser,
  POSTCreatePlaylist,
};

export default playlistAPIs;
