import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface AppState {
  authState: boolean,
  state: number,
  authToken: string,
  userInfo: {},
  idProjectSelected: string,
}

// Initial state
const initialState: AppState = {
  authState: false,
  state: 1,
  authToken: "",
  userInfo: {},
  idProjectSelected: "",
}

// Actual Slice
export const authSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload
    },
    setState(state, action) {
      state.state = action.payload
    },
    setAuthToken(state, action) {
      state.authToken = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setIdProjectSelected(state, action) {
      state.idProjectSelected = action.payload
    },
  },
})

export const {
  setAuthState,
  setState,
  setAuthToken,
  setUserInfo,
  setIdProjectSelected,
} = authSlice.actions

export const SelectAppState = (state: AppState) => state.AppState

export default authSlice.reducer