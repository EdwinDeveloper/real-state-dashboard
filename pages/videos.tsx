import React, { FC } from 'react'
import Layout from '../components/Layout'
import { YoutubeCard } from '../components/projectComponents/Cards/YoutubeCard'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import Box from '@material-ui/core/Box'

interface SingleVideo {
  etag: string,
  id: Id,
  kind: string,
  snippet: Snippet,
}
interface Id {
  kind: string,
  videoId: string,
}
interface Snippet {
  channelId: string,
  channelTitle: string,
  description: string,
  liveBroadcastContent: string,
  publishTime: string,
  publishedAt: string,
  title: string,
}

const Videos:FC = () => {

  const AppState = UseSelector(SelectAppState)
  const { userInfo } = AppState

  const renderCards = () => {
    return userInfo.projects !== undefined ? userInfo.videos.items.map((singleVideo: SingleVideo) => {
      return <YoutubeCard
        videoId={singleVideo.id.videoId}
      />
    }) : null
  }

  return (
    <Layout>
      <Box style={{
        width: "90%",
        height: "90vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF',
      }}>
        {renderCards()}
      </Box>
    </Layout>
  )
}

export default Videos