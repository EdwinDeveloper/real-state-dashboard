import Layout from "../components/Layout"
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'
import LogInF from '../screens/logInF'
import { selectAppState } from '../redux/index'
import { useDispatch, useSelector } from "react-redux"

export default function Home() {

  const AppState = useSelector(selectAppState);
  const { state } = AppState
  console.log("the state : ", state)
  
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