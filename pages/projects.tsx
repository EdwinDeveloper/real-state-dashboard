import React, { useEffect, useRef, useState} from 'react'
import Layout from "../components/Layout"
import ListProjects from '../components/projectComponents/ListProjects'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import CardProject from '../components/projectComponents/CardProject'

const projects = () => {

  const [show, setShow] = useState<String | null>('list')

  useEffect(()=>{

  }, [])

  const handleShow = (screen: String) => {
    console.log("no mascreen: ", screen)
    setShow(screen)
  }

  return (
    <Layout>
      { show === 'list' &&
        <Box>
          <Box style={{
            marginTop: 30,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
          }}>
            <Button
              style={{
                backgroundColor: "#159988",
                width: "20%",
                marginBottom: 50,
              }}
              onClick={()=>{handleShow("new")}}
              variant="contained"
              color="success"
            >
              Nuevo Proyecto
            </Button>
          </Box>
          <Box style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            backgroundColor: '#FFFFFF',
          }}>
            <CardProject/>
            <CardProject/>
            <CardProject/>
            <CardProject/>
            <CardProject/>
            <CardProject/>
            <CardProject/>
            <CardProject/>
          </Box>
        </Box>
      }
      { show === 'new' &&
        <Box style={{
          width: "100%",
          height: 1900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "scroll",
        }}>
          <Button
            style={{
              backgroundColor: "#159988",
              width: "20%",
              marginBottom: 50,
            }}
            variant="contained"
            color="success"
            onClick={()=>{handleShow("list")}}
          >
            Lista de proyectos
          </Button>
          <ListProjects handleShow={handleShow}/>
        </Box> 
      }
    </Layout>
  )
}

export default projects