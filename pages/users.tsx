import React, { FC, useState } from "react"
import Layout from "../components/Layout"
import Box from '@material-ui/core/Box'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import CardUser from "../components/projectComponents/Cards/CardUser"

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

  const userSelect = (id: string) => {
    setUserSelected(id)
    setUserState('action')
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
        userSelect={userSelect}
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
      { userState === '' &&
        "Hola"
      }
    </Layout>
  )
}

export default Users