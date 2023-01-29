import React, { FC } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

export interface YoutubeParams {
  videoId: string,
}

export const YoutubeCard:FC<YoutubeParams> = (props) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }
  const opts: YouTubeProps['opts'] = {
    height: '300',
    width: '400',
    playerVars: {
      autoplay: 0,
    },
  }
  return <YouTube style={{
    marginBottom: 30,
  }} videoId={props.videoId} opts={opts} onReady={onPlayerReady} />
}