import { FC } from 'react'
import Layout from "../components/Layout"
import LogInF from '../screens/logInF'
import SetUp from '../screens/setUp'
import ResetPass from '../screens/resetPass'
import { useAppSelector } from '../redux/hooks'

const Home:FC = (props) => {

  const state = useAppSelector((state)=> state.State.state)

  console.log("tag ingex : ", state)
  
  return (
    <>
      { state === 1 && <LogInF/> }
      { state === 2 &&
        <Layout>
        </Layout>
      }
      { state === 3 && <SetUp></SetUp> }
      { state === 4 && <ResetPass></ResetPass> }
    </>
  )
}

export default Home