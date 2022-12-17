import React from "react"
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      heigth: "100vh",
      justifyContent: "flex-start",
    }}>
      <Sidebar />
      <div style={{
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        overflow: "scroll",
        padding: "1rem",
      }}>
          {children}
      </div>
    </div>
  )
}

export default Layout