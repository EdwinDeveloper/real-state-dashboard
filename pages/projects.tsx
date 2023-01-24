import React, { FC, useEffect as UseEffect, useRef, useState as UseState} from 'react'
import Layout from "../components/Layout"
import ListProjects from '../components/projectComponents/ListProjects'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import CardProject from '../components/projectComponents/CardProject'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import { Project } from '../components/Models/Project'

const projects:FC = (props) => {

  const AppState = UseSelector(SelectAppState);
  const { userInfo } = AppState

  const [show, setShow] = UseState<String | null>('list')

  UseEffect(()=>{

  }, [])

  const handleShow = (screen: String) => {
    setShow(screen)
  }

  const renderCards = () => {
    return userInfo.projects !== undefined ? userInfo.projects.map((project: Project) => {
      return <CardProject
        id={project.id} 
        name={project.name}
        description={project.description}
        stateForm={handleShow}
      />
    }) : null
  };

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
              onClick={()=>{handleShow("form")}}
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
            {renderCards()}
          </Box>
        </Box>
      }
      { show === 'form' &&
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