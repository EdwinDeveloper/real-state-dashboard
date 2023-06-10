import React from "react"
import Sidebar from "./Sidebar"
import Box from '@mui/material/Box'

const Layout = ({ children }) => {
  
  return (
    <Box style={{
      display: "flex",
      flexDirection: "row",
      heigth: "100vh",
      justifyContent: "flex-start",
    }}>
      <Sidebar />
      <Box style={{
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
      </Box>
    </Box>
  )
}

export default Layout