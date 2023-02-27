import React, { FC, useEffect as UseEffect, useRef, useState as UseState} from 'react'
import Layout from "../components/Layout"
import ListProjects from '../components/projectComponents/ListProjects'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import CardProject from '../components/projectComponents/Cards/CardProject'
import { SelectAppState } from '../redux/slices/UserInfo/index'
import { useAppSelector } from '../redux/hooks'
import { Project } from '../components/Models/Project'
import { setIdProjectSelected } from '../redux/slices/projects'
import { useDispatch as UseDispatch } from "react-redux"

const projects:FC = (props) => {

  const projects = useAppSelector((state)=> state.projects.projects)

  const dispatch = UseDispatch()

  const [show, setShow] = UseState('list')

  UseEffect(()=>{

  }, [])

  const handleShow = (screen: string) => {
    setShow(screen)
  }

  const cancelForm = () => {
    handleShow("list")
    dispatch(setIdProjectSelected(''))
  }

  const renderCards = () => {
    return projects !== undefined ? projects.map((project: Project) => {
      return <CardProject key={project.id}
        id={project.id} 
        name={project.name}
        model={project.model}
        images={project.images}
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
            onClick={()=>{cancelForm()}}
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