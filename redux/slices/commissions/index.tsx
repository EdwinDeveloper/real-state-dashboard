import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Commission } from "../../../components/Models/Commission"

type InitialState = {
    commissions: Commission[]
}

const initialState: InitialState = {
    commissions: []
}

export const CommissionsSlice = createSlice({
    name: 'commissions',
    initialState,
    reducers: {
        setCommissions(state, action: PayloadAction<Commission[]>) {
            state.commissions = action.payload
        }
    }
})

export const { setCommissions } = CommissionsSlice.actions

export const State = (state: InitialState) => state

export default CommissionsSlice.reducer