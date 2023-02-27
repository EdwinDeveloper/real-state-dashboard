import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Companie } from "../../../pages/companies"

type InitialState = {
    companies: Companie[]
}

const initialState: InitialState = {
    companies: []
}

export const CompaniesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies(state, action: PayloadAction<Companie[]>) {
            state.companies = action.payload
        }
    }
})

export const { setCompanies } = CompaniesSlice.actions

export const State = (state: InitialState) => state

export default CompaniesSlice.reducer