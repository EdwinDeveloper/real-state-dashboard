import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../../redux/fetch/responses"

type InitialState = {
    /*****END USERS****+**/
    users: User[]

    /*****STAFF TEAM****+**/
    staff: User[]
}

const initialState: InitialState = {
    users: [],
    staff: []
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
        setStaff(state, action: PayloadAction<User[]>) {
            state.staff = action.payload
        }
    }
})

export const { setUsers, setStaff } = UsersSlice.actions

export const Users = (users: InitialState) => users.users

export default UsersSlice.reducer