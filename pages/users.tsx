import React, { FC, useState } from "react"
import Layout from "../components/Layout"
import CardUser from "../components/projectComponents/Cards/CardUser"
import CardUserProject from '../components/projectComponents/Cards/CardUserInvestment'
import { User, Investment, Referral, Project } from '../redux/fetch/responses'
import { useAppSelector } from "../redux/hooks"
import UsersInDB from "./users/usersInDB"
import ReferralList from "./users/referralsList"
import UserInvestments from "./users/userInvestments"
import NewInvestment from "./users/newInvestment"

const Users:FC = (props) => {

  const users = useAppSelector( (state)=> state.users.users )
  const projects = useAppSelector( (state)=> state.projects.projects )

  const [userState, setUserState] = useState('main')
  const [userSelected, setUserSelected] = useState('')
  const [nameUserSelected, setNameUserSelected] = useState('')
  const [userInvestment, setUserInvestment] = useState<Investment[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>(projects !== undefined ? projects : [])

  const [referrals, setReferrals] = useState<Referral[]>([])

  const userSelect = (id: string, action: string, investments: Investment[], nameUser: string) => {
    setUserSelected(id)
    setNameUserSelected(nameUser)
    setUserState(action)
    setUserInvestment(investments)
  }

  const referralsUser = (idUser: string, action: string, referrals: Referral[], nameUser: string) => {
    setNameUserSelected(nameUser)
    setUserState(action)
    setReferrals(referrals)
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
    return userInvestment.length > 0 ? userInvestment.map((investment: Investment) => {
      return <CardUserProject
      key={investment.project.id}
        projectId={investment.project.id}
        userId={userSelected}
        name={investment.project.name}
        model={investment.project.model}
        images={investment.project.images}
        description={investment.project.description}
        action={userState}

        pre_sale_price={0.0}

        ordinary={investment.ordinary}
        status={investment.status}
        bonus={investment.bonus}
      />
    }) : null
  }

  const renderAllProjects = () => {
    return allProjects !== undefined && allProjects !== null ? allProjects.map((project: Project) => {
      return <CardUserProject key={project.id}
        projectId={project.id}
        userId={userSelected}
        name={project.name}
        model={project.model}
        images={project.images}
        description={project.description}
        action={userState}
        ordinary={0}

        pre_sale_price={project.pre_sale_price}

        status={""}
        bonus={""}
      />
    }) : null
  }

  return (
    <Layout>
      { userState === 'main' &&
        <UsersInDB renderUsers={renderUsers}/>
      }
      { userState === 'investments' &&
        <UserInvestments setUserState={setUserState} nameUserSelected={nameUserSelected} renderCards={renderCards} />
      }
      { userState === 'newInvestment' && 
          <NewInvestment setUserState={setUserState} filterProjects={filterProjects} renderAllProjects={renderAllProjects} />
      }
      { userState === 'referrals' &&
        <ReferralList setUserState={setUserState} nameUserSelected={nameUserSelected} referrals={referrals}/>
      }
    </Layout>
  )
}

export default Users