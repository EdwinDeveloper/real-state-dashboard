import { createSlice } from '@reduxjs/toolkit'

export const stateAppReducer = createSlice({
    name: "stateApp",
    initialState: {
        state: 1,
        token: '',
    },
    reducers: {
        setState: (state, action) => {
            state.state = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const { setState, setToken } = stateAppReducer.actions

export default stateAppReducer.reducer