import React, { useRef} from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import logo from '../assets/loadingLogo.png'
import { logIn, meInfo } from '../redux/fetch/services'
import { setState } from '../redux/slices/state'
import { setUserInfo } from "../redux/slices/UserInfo/index"
import { setCompanies } from '../redux/slices/companies'
import { setAuthToken } from '../redux/slices/state'
import { setProjects } from '../redux/slices/projects'
import { setBonuses } from '../redux/slices/bonuses'
import { useAppDispatch } from '../redux/hooks'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { FetchCall } from '../redux/fetch/FetchCall'
import { setUsers, setStaff, setMe, setMyId } from '../redux/slices/users'
import { setVideos } from '../redux/slices/videos'
import { LoginRequest } from '../redux/fetch/requests'
import { LoginResponse, MeInfoResponse } from '../redux/fetch/responses'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © SD ASOCIADOS'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignIn() {

  const [message, setMessage] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState('')

  const dispatch = useAppDispatch()

  const ModalRef = useRef<any>()

  const handleSubmit = async() => {
    if(ModalRef.current !== undefined && ModalRef.current !== null){
      const { openModal } = ModalRef.current
      if(email===""){
        setMessage('Debes colocar un correo electronico para iniciar sesión')
        openModal()
      }else if(password===""){
        setMessage('Debes colocar tu contraseña de acceso')
        openModal()
      }else{
        let lr: LoginRequest = { email: email, password: password }
        let rli = await FetchCall<LoginResponse>(logIn(lr, ""))
        if(rli.status===200){
          let responseMeInfo = await FetchCall<MeInfoResponse>(meInfo("", rli.data.token))
          if(responseMeInfo.data.is_staff){
            
            setTimeout(() => {
              dispatch(setAuthToken(rli.data.token))
              dispatch(setUserInfo(responseMeInfo.data))
              dispatch(setBonuses(responseMeInfo.data.bonuses))
              dispatch(setCompanies(responseMeInfo.data.companies))
              dispatch(setProjects(responseMeInfo.data.projects))
              dispatch(setUsers(responseMeInfo.data.users))
              dispatch(setVideos(responseMeInfo.data.videos))
              dispatch(setStaff(responseMeInfo.data.staff))
              dispatch(setState(2))
            }, 500)
            setMessage('Bienvenido')
            openModal()
          }else{
            setMessage('Solo acceden usuarios staff')
            openModal()
          }
        }else {
          setMessage(rli.messages[0].value)
          openModal()
        }
    } 
  }
}

  return (
    <ThemeProvider theme={theme}>
      <ModalPer ref={ModalRef} title={"Formulario"} message={message}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image alt='logo' src={logo} width='80' height='80'/>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>{setPassword(event.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              style={{
                backgroundColor: "#000000"
              }}
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={()=> {
                  dispatch(setState(3))
                }} href="#" variant="body2">
                  {"No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}