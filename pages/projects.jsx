import React from 'react'
import Layout from '../components/Layout'
import classNames from 'classnames'

const projects = () => {
  return (
    <Layout>
      <div className={classNames('w-100 min-h-screen text-center rounded-3xl bg-gradient-to-b bg-teal-100')}>
        projectos
      </div>
    </Layout>
  )
}

export default projects