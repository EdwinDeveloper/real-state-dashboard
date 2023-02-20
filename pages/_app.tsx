import React, { FC } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from "../redux/store"
import { Provider } from 'react-redux'

const MyApp:FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { emotionCache, pageProps } = props;
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.useWrappedStore(MyApp);
