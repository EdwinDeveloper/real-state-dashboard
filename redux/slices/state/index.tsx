import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    state: number,
    authToken: string,
}

const initialState: InitialState = {
    state: 1,
    authToken: "",
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setState(state, action: PayloadAction<number>) {
            state.state = action.payload
        },
        setAuthToken(state, action: PayloadAction<string>) {
            state.authToken = action.payload
        }
    }
})

export const { setState, setAuthToken } = stateSlice.actions

export const State = (state: InitialState) => state

export default stateSlice.reducer