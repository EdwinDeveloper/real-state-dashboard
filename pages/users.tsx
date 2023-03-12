import React, { FC, useState } from "react"
import Layout from "../components/Layout"
import Box from '@material-ui/core/Box'
import CardUser from "../components/projectComponents/Cards/CardUser"
import CardUserProject from '../components/projectComponents/Cards/CardUserProject'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import CardUserReferrals from '../components/projectComponents/Cards/CardReferral'
import { User, Investment, Referral, Project } from '../redux/fetch/responses'
import { useAppSelector } from "../redux/hooks"

const Users:FC = (props) => {

  const users = useAppSelector( (state)=> state.users.users )
  const projects = useAppSelector( (state)=> state.projects.projects )

  const [userState, setUserState] = useState('main')
  const [userSelected, setUserSelected] = useState('')
  const [filterUserProjects, setFilterUserProjects] = useState<Project[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>(projects !== undefined ? projects : [])

  const [referrals, setReferrals] = useState<Referral[]>([])

  const userSelect = (id: string, action: string, investments: Investment[]) => {
    setUserSelected(id)
    setUserState(action)
    userProjects(id, investments)
  }

  const referralsUser = (idUser: string, action: string, referrals: Referral[]) => {
    setUserState(action)
    setReferrals(referrals)
  }

  const userProjects = (id: string, investments: Investment[]) => {
    let projectsIn: Project[] = []
    projects.map((project: Project)=>{
      investments.map((investment)=>{
        investment.id === project.id && projectsIn.push(project)
      })
    })
    setFilterUserProjects(projectsIn)
  }

  const filterProjects = (value: string)=>{
    if(value!="" && allProjects !== undefined){
        let listCheck:Project[] = []
        allProjects.filter((project: Project)=>{ if(project.model.includes(value)) listCheck.push(project) })
        setAllProjects(listCheck)
    } else {
      setAllProjects(projects)
    }
  }

  const renderUsers = () => {
    return projects !== undefined && projects !== null ? users.map((singleUser: User) => {
      return <CardUser
        key={singleUser.id}
        id={singleUser.id}
        name={singleUser.name}
        last_name={singleUser.last_name}
        email={singleUser.email}
        country_code={singleUser.country_code}
        phone_number={singleUser.phone_number}
        investments={singleUser.investments}
        referrals={singleUser.referrals}
        userSelect={userSelect}
        userReferrals={referralsUser}
      />
    }) : null
  }

  const renderCards = () => {
    return filterUserProjects.length > 0 ? filterUserProjects.map((project: Project) => {
      return <CardUserProject
      key={project.id}
        id={project.id}
        userId={userSelected}
        name={project.name}
        model={project.model}
        images={project.images}
        description={project.description}
        action={userState}
      />
    }) : null
  }

  const renderAllReferrals = () => {
    return referrals.length > 0 ? referrals.map((referral: Referral) => {
      return <CardUserReferrals key={referral.id}
        referral={referral}
        setUserState={setUserState}
      />
    }) : null
  }

  const renderAllProjects = () => {
    return allProjects !== undefined && allProjects !== null ? allProjects.map((project: Project) => {
      return <CardUserProject key={project.id}
        id={project.id} 
        userId={userSelected}
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
          width: "95%",
          marginTop: 30,
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
                    onChange={(model: any)=>{filterProjects(model.target.value)}}
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
      { userState === 'referrals' &&
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%",
        marginTop: 100,
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
          {renderAllReferrals()}
        </Box>
      </Box>
      }
    </Layout>
  )
}

export default Users