import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

// Type for our state
export interface AppState {
  authState: boolean,
  state: number,
  authToken: string,
  userInfo: {}
}

// Initial state
const initialState: AppState = {
  authState: false,
  state: 1,
  authToken: "",
  userInfo: {}
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
      state.authState = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     }
    //   },
    // },

  },
})

export const { setAuthState, setState, setAuthToken, setUserInfo } = authSlice.actions

export const SelectAppState = (state: AppState) => state.AppState

export default authSlice.reducer