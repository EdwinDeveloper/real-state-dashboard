import React from "react"
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-primary flex-1 inline-flex min-h-screen p-4 justify-center items-center">
          {children}
      </div>
    </div>
  )
}

export default Layout