import { createSlice } from "@reduxjs/toolkit"

// Type for our state
export interface UserInfo {
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
    is_staff: false
  }
}

// Initial state
const initialState: UserInfo = {
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
    is_staff: false
  }
}

// Actual Slice
export const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  },
})

export const { setUserInfo } = UserInfoSlice.actions

export const SelectAppState = (state: UserInfo) => state

export default UserInfoSlice.reducer