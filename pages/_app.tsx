import React, { FC } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from "../redux/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persist from '../redux/persist'

const MyApp:FC<AppProps> = ({ Component, ...rest }) => {

  const { persistor } = persist()
  const { store, props } = wrapper.useWrappedStore(rest)
  const { emotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
        <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
