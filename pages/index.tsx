import { FC } from 'react'
import Layout from "../components/Layout"
import LogInF from '../screens/logInF'
import { useAppSelector } from '../redux/hooks'

const Home:FC = (props) => {

  const state = useAppSelector((state)=> state.State.state)
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