import React, { FC } from 'react'
import Layout from '../components/Layout'
import { YoutubeCard } from '../components/projectComponents/Cards/YoutubeCard'
import Box from '@material-ui/core/Box'
import { Item } from '../components/Models/video'
import { useAppSelector } from '../redux/hooks'
const Videos:FC = (props) => {

  const videos = useAppSelector((state)=> state.videos.videos)

  const renderCards = () => {
    return videos.items !== undefined && videos.items.length > 0 ? videos.items.map((singleVideo: Item) => {
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