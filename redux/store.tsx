import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authSlice from "./slices/UserInfo/index";
import stateSlice from './slices/state'
import CompaniesSlice from './slices/companies'
import ProjectsSlice from './slices/projects'
import CommissionsSlice from './slices/commissions'
import UsersSlice from './slices/users'
import VideosSlice from './slices/videos'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AppState', 'State', 'companies', 'projects', 'commissions', 'users', 'videos']
}

const rootReducer = combineReducers({
  AppState: authSlice,
  State: stateSlice,
  companies: CompaniesSlice,
  projects: ProjectsSlice,
  commissions: CommissionsSlice,
  users: UsersSlice,
  videos: VideosSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
