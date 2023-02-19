import React, { FC } from 'react'
import Layout from '../components/Layout'
import { YoutubeCard } from '../components/projectComponents/Cards/YoutubeCard'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import Box from '@material-ui/core/Box'
import { Item } from '../components/Models/video'
const Videos:FC = () => {

  const AppState = UseSelector(SelectAppState)
  const { userInfo } = AppState

  const renderCards = () => {
    return userInfo.projects !== undefined ? userInfo.videos.items.map((singleVideo: Item) => {
      return <YoutubeCard
        key={singleVideo.id.videoId}
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