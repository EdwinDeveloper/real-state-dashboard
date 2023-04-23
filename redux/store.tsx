import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/UserInfo/index";
import stateSlice from './slices/state'
import meInfoSlice from './slices/UserInfo'
import CompaniesSlice from './slices/companies'
import ProjectsSlice from './slices/projects'
import BonusesSlice from './slices/bonuses'
import UsersSlice from './slices/users'
import VideosSlice from './slices/videos'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AppState', 'State', 'companies', 'projects', 'bonuses', 'users', 'videos']
}

const rootReducer = combineReducers({
  AppState: authSlice,
  State: stateSlice,
  meInfo: meInfoSlice,
  companies: CompaniesSlice,
  projects: ProjectsSlice,
  bonuses: BonusesSlice,
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
