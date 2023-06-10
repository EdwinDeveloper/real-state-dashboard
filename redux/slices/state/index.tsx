import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    state: number,
    authToken: string,
    dueDate: number,
}

const initialState: InitialState = {
    state: 1,
    authToken: "",
    dueDate: 0,
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
        },
        setDueDate(state, action: PayloadAction<number>) {
            state.dueDate = action.payload
        },
    }
})

export const { setState, setAuthToken, setDueDate } = stateSlice.actions

export const State = (state: InitialState) => state

export default stateSlice.reducer