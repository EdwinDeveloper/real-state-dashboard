import React, { FC } from "react"
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

  const renderUsers = () => {
    return userInfo.projects !== undefined ? userInfo.users.map((singleUser: CardUserProps) => {
      return <CardUser
        id={singleUser.id}
        name={singleUser.name}
        last_name={singleUser.last_name}
        email={singleUser.email}
      />
    }) : null
  }

  return (
    <Layout>
      <Box style={{
        width: "90%",
        height: "90vh",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        backgroundColor: '#FFFFFF',
      }}>
        {renderUsers()}
      </Box>
    </Layout>
  )
}

export default Users