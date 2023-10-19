import React, {useState, useEffect, useContext, useRef} from 'react';
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, Switch, Text, View, Share} from 'react-native';
import {GetNoteAction} from '../actions/GetNote';
import Video from 'react-native-video';
import WDHT from './test.mp4'
// import WDHT from './World Domination How-To.m3u8'

import videojs from 'video.js';
import Hls from 'hls.js';

const MainScreen = props => {
  const isFocus = useIsFocused();
  const appContext = useContext(AppContext);
  const videoRef = useRef();

  var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 300,
      height: 500,
    },
  });
  useEffect(() => {
    const CheckVideoAndEncode = async () => {
    };
    const LoadVideo = async () => {
      try {
        var obj_play;
        let url = 'http://192.168.1.99:9000/redirect/hls/World Domination How-To';

        console.log(videoRef)
        const config = {
          startPosition: 0, // can be any number you want
        };
        obj_play = {
          fill: true,
          fluid: true,
          autoplay: true,
          controls: true,
          preload: 'auto',
          loop: true,
          sources: [
            // {
            //   src: data.path,
            //   type: 'application/x-mpegURL',
            //   withCredentials: true,
            // },
          ],
        };
        const hls = new Hls(config);
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.subtitleDisplay = true;

        const _player = videojs(
          videoRef.current,
          obj_play,
          function onPlayerReady() {
            videojs.log('Your player is ready!');

            // In this context, `this` is the player that was created by Video.js.
            this.play();

            // volume scale 0 - 1
            const defaultVolume = 0.4;
            this.volume(defaultVolume);

            // How about an event listener?
            this.on('ended', function () {
              videojs.log('Awww...over so soon?!');
            });
          },
        );
        console.log(_player);

        // _player.on('xhr-hooks-ready', () => {
        //   const playerRequestHook = (options) => {
        //     options.beforeSend = (xhr) => {
        //       xhr.setRequestHeader('foo', 'bar');
        //     };
        //     console.log(options)
        //     return options;
        //   };
        //   _player.tech().vhs.xhr.onResponse(playerRequestHook);
        // });
      } catch (error) {
        console.log(error);
      }
    };
    //CheckVideoAndEncode();
    LoadVideo();
  }, []);
  return (
    <View style={styles.mainScreen}>
      <Text>12221</Text>
      <Video
        //HOW THE FUCK???? TẠI SAO HLS NGƯỜI KHÁC COI ĐC CÒN CỦA T THÌ ÉO?????
        source={WDHT} // the video file
        // source={{uri: "https://tzvodacomcontent.s3.amazonaws.com/video-1654952965085/video-1654952965085.m3u8"}}
        // source={{uri: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"}}

        paused={false} // make it start    r
        style={styles.backgroundVideo} // any style you want
        repeat={true} // make it a loop
        ref={videoRef} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={error => {
          console.log(error);
        }}
      />
    </View>
  );
};

export default MainScreen;
