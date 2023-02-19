import { createSlice } from "@reduxjs/toolkit"
import { Commission } from "../components/Models/Commission"
import { Companie } from "../components/Models/Companie"
import { UserInfo } from "../components/Models/UserInfo"

// Type for our state
export interface AppState {
  authState: boolean,
  state: number,
  authToken: string,
  userInfo: UserInfo,
  idProjectSelected: string,
  commissionsList: Commission[],
  companiesList: Companie[],
  AppState: {
      authState: boolean,
      state: number,
      authToken: string,
      userInfo: UserInfo,
      idProjectSelected: string,
      commissionsList: Commission[],
      companiesList: Companie[],
  },
}

// Initial state
const initialState: AppState = {
  authState: false,
  state: 1,
  authToken: "",
  userInfo: {
    id: "",
    country_code: "",
    phone_number: "",
    gender: "",
    birthday: "",
    email: "",
    name: "",
    last_name: "",
    is_active: false,
    is_staff: false,
    projects: [],
    videos: {
      kind: "",
      etag: "",
      nextPageToken: "",
      regionCode: "",
      items: [],
    },

    commissions: [],
    companies: [],
    users: [],
  },
  idProjectSelected: "",
  commissionsList: [],
  companiesList: [],
  AppState: {
    authState: false,
    state: 0,
    authToken: "",
    userInfo: {
      id: "",
      country_code: "",
      phone_number: "",
      gender: "",
      birthday: "",
      email: "",
      name: "",
      last_name: "",
      is_active: false,
      is_staff: false,
      projects: [],
      videos: {
        kind: "",
        etag: "",
        nextPageToken: "",
        regionCode: "",
        items: [],
      },

      commissions: [],
      companies: [],
      users: [],
    },
    idProjectSelected: "",
    commissionsList: [],
    companiesList: []
  },
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
    setCommissionsList(state, action) {
      state.commissionsList = action.payload
    },
    setCompaniesList(state, action) {
      state.companiesList = action.payload
    }
  },
})

export const {
  setAuthState,
  setState,
  setAuthToken,
  setUserInfo,
  setIdProjectSelected,
  setCommissionsList,
  setCompaniesList,
} = authSlice.actions

export const SelectAppState = (state: AppState) => state.AppState

export default authSlice.reducer