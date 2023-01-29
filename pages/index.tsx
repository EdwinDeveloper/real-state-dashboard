import { FC } from 'react'
import Layout from "../components/Layout"
import LogInF from '../screens/logInF'
import { SelectAppState } from '../redux/index'
import { useSelector } from "react-redux"

const Home:FC = () => {

  const AppState = useSelector(SelectAppState);
  const { state } = AppState
  
  return (
    <>
      { state === 1 && <LogInF/> }
      { state === 2 &&
        <Layout>
        </Layout>
      }
    </>
  )
}

export default Home