import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../../redux/fetch/responses"

type InitialState = {
    users: User[]
}

const initialState: InitialState = {
    users: []
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        }
    }
})

export const { setUsers } = UsersSlice.actions

export const Users = (users: InitialState) => users.users

export default UsersSlice.reducer