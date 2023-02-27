import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Video } from "../../../components/Models/video"

type InitialState = {
    videos: Video
}

const initialState: InitialState = {
    videos: {
        kind: '',
        etag: '',
        nextPageToken: '',
        regionCode: '',
        items: []
    }
}

export const VideosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideos(state, action: PayloadAction<Video>) {
            state.videos = action.payload
        }
    }
})

export const { setVideos } = VideosSlice.actions

export const Videos = (video: InitialState) => video.videos

export default VideosSlice.reducer