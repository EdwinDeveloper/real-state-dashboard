import React, { FC } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../redux/store'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

const MyApp:FC<AppProps> = ({ Component, pageProps, ...rest }) => {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
