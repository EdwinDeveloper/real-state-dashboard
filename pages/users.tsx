import React, { FC, useState, useEffect } from "react"
import Layout from "../components/Layout"
import Box from '@material-ui/core/Box'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import CardUser from "../components/projectComponents/Cards/CardUser"
import { Project } from "../components/Models/Project"
import CardUserProject from '../components/projectComponents/Cards/CardUserProject'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'

interface CardUserProps {
  id: string,
  name: string,
  last_name: string,
  email: string,
  country_code: string,
  phone_number: string,
  investments: Investment[],
  referrals: Referral[],
}
interface Investment {
  id: string,
}
interface Referral {
  id: string,
  phone_number: string,
  gender: string,
  name: string,
  last_name: string,
  project: string,
  commission: string,
  status: string,
}

const Users:FC = () => {

  const AppState = UseSelector(SelectAppState)
  const { userInfo } = AppState
  const [userState, setUserState] = useState('main')
  const [userSelected, setUserSelected] = useState('')
  const [filterUserProjects, setFilterUserProjects] = useState<Project[]>()
  const [allProjects, setAllProjects] = useState<Project[]>(userInfo.projects)

  const userSelect = (id: string, action: string, investments: Investment[]) => {
    setUserSelected(id)
    setUserState(action)
    userProjects(id, investments)
  }

  const userProjects = (id: string, investments: Investment[]) => {
    let projects: Project[] = []
    userInfo.projects.map((project: Project)=>{
      investments.map((investment)=>{
        investment.id === project.id && projects.push(project)
      })
    })
    setFilterUserProjects(projects)
  }

  const filterProjects = (value: string)=>{
    if(value!="" && allProjects !== undefined){
        let listCheck:Project[] = []
        allProjects.filter((project: Project)=>{ if(project.model.includes(value)) listCheck.push(project) })
        setAllProjects(listCheck)
    } else {
      setAllProjects(userInfo.projects)
    }
  }

  const renderUsers = () => {
    return userInfo.projects !== undefined ? userInfo.users.map((singleUser: CardUserProps) => {
      return <CardUser
        id={singleUser.id}
        name={singleUser.name}
        last_name={singleUser.last_name}
        email={singleUser.email}
        country_code={singleUser.country_code}
        phone_number={singleUser.phone_number}
        investments={singleUser.investments}
        userSelect={userSelect}
      />
    }) : null
  }

  const renderCards = () => {
    return filterUserProjects !== undefined ? filterUserProjects.map((project: Project) => {
      return <CardUserProject
        id={project.id} 
        name={project.name}
        model={project.model}
        images={project.images}
        description={project.description}
        action={userState}
      />
    }) : null
  }

  const renderAllProjects = () => {
    return allProjects !== undefined ? allProjects.map((project: Project) => {
      return <CardUserProject
        id={project.id} 
        name={project.name}
        model={project.model}
        images={project.images}
        description={project.description}
        action={userState}
      />
    }) : null
  }

  return (
    <Layout>
      { userState === 'main' &&
        <Box style={{
          width: "94%",
          height: "90vh",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "stretch",
        }}>
          {renderUsers()}
        </Box>
      }
      { userState === 'investments' &&
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box>
              <Button
                style={{
                  backgroundColor: "#159988",
                  width: 300,
                  marginBottom: 50,
                }}
                onClick={()=>setUserState('main')}
                variant="contained"
                color="success"
              >
                Volver
              </Button>
          </Box>
          <Box>
            {renderCards()}
          </Box>
        </Box>
      }
      { userState === 'newInvestment' && 
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
            <Box style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'cemter'
            }}>
                <Button
                  style={{
                    backgroundColor: "#159988",
                    width: 300,
                    marginBottom: 50,
                  }}
                  onClick={()=>setUserState('main')}
                  variant="contained"
                  color="success"
                >
                  Volver
                </Button>
                <ValidationTextField
                    label="Nombre del proyecto"
                    required
                    variant="outlined"
                    helperText="Introduce el nombre del proyecto"
                    defaultValue=""
                    placeholder='Nombre del proyecto'
                    id="validation-outlined-input"
                    onChange={(model)=>{filterProjects(model.target.value)}}
                  />
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
              {renderAllProjects()}
            </Box>
        </Box>
      }
    </Layout>
  )
}

export default Users