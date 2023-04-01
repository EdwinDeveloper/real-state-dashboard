import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Bonus } from "../../fetch/responses"

type InitialState = {
    bonuses: Bonus[]
}

const initialState: InitialState = {
    bonuses: []
}

export const BonusesSlice = createSlice({
    name: 'bonuses',
    initialState,
    reducers: {
        setBonuses(state, action: PayloadAction<Bonus[]>) {
            state.bonuses = action.payload
        }
    }
})

export const { setBonuses } = BonusesSlice.actions

export const State = (state: InitialState) => state

export default BonusesSlice.reducer