import { FC } from 'react'
import Layout from "../components/Layout"
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'
import LogInF from '../screens/logInF'
import { SelectAppState } from '../redux/index'
import { useSelector } from "react-redux"

const Home:FC = () => {

  const AppState = useSelector(SelectAppState);
  const { state } = AppState

  console.log("the app state : ", AppState)
  
  return (
    <>
      { state === 1 && <LogInF/> }
      { state === 2 &&
        <Layout>
          <Box>
            <Button
              style={{
              backgroundColor: "#159988",
              width: "20%",
                marginBottom: 50,
              }}
              onClick={()=>{console.log("a ver")}}
              variant="contained"
              color="success"
            >
              Nuevo Bono
            </Button>
          </Box>
          <Box>

          </Box>
        </Layout>
      }
    </>
  )
}

export default Home