import axios from 'axios';
import {PROXY_CLOUD, PROXY_TUE_LOCAL} from '@env';

export const GETAllPlaylistByUser = async token => {
  var url = PROXY_CLOUD + '/api/v1/playlist/get-all-playlist';
  const {data} = await axios({
    method: 'get',
    url: url,
    validateStatus: () => true,
    headers: {
      authorization: 'Bearer ' + token,
    },
  });
  return data.data;
};

export const POSTCreatePlaylist = async (playlistname, token) => {
  var url = PROXY_CLOUD + '/api/v1/playlist/create-playlist';
  const {data} = await axios.post(
    url,
    {playlistname: playlistname},
    {
      validateStatus: () => true,
      headers: {
        authorization: 'Bearer ' + token,
      },
    },
  );
  return data;
};

export const POSTAddVideoToPlaylistAction = async (
  videoID,
  infoID,
  token,
  playlistID,
) => {
  console.log({videoID, infoID, token, playlistID});
  var url = PROXY_CLOUD + '/api/v1/playlist/add-playlist';
  const {data} = await axios.post(
    url,
    {playlistID: playlistID, videoID: videoID, infoID: infoID},
    {
      validateStatus: () => true,
      headers: {
        authorization: 'Bearer ' + token,
      },
    },
  );
  return data;
};

export const DELETEPlaylistAction = async playlistID => {
  console.log({playlistID});
  var url = PROXY_CLOUD + '/api/v1/playlist/delete-playlist';
  const {data} = await axios.post(
    url,
    {playlistID: playlistID},
    {
      validateStatus: () => true,
    },
  );
  return data;
};

const playlistAPIs = {
  POSTAddVideoToPlaylistAction,
  GETAllPlaylistByUser,
  POSTCreatePlaylist,
  DELETEPlaylistAction,
};

export default playlistAPIs;
