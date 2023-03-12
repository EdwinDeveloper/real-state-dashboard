import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project } from "../../fetch/responses"

type InitialState = {
    projects: Project[],
    idProjectSelected: string,
}

const initialState: InitialState = {
    projects: [],
    idProjectSelected: "",
}

export const ProjecstSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload
        },
        setIdProjectSelected(state, action: PayloadAction<string>) {
            state.idProjectSelected = action.payload
        },
    }
})

export const { setProjects, setIdProjectSelected } = ProjecstSlice.actions

export const State = (projects: InitialState) => projects.projects

export default ProjecstSlice.reducer