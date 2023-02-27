import React, { useEffect, useRef} from 'react'
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
import { apiCall } from '../redux/fetch/management'
import { setState } from '../redux/slices/state'
import { setAuthState, setUserInfo, setCommissionsList } from "../redux/slices/UserInfo/index"
import { setCompanies } from '../redux/slices/companies'
import { setAuthToken } from '../redux/slices/state'
import { setProjects } from '../redux/slices/projects'
import { setCommissions } from '../redux/slices/commissions'
import { useAppDispatch } from '../redux/hooks'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { AuthTokenResponse } from '../components/Models/AuthTokenResponse'
import { UserInfo } from '../components/Models/UserInfo'
import { setUsers } from '../redux/slices/users'
import { setVideos } from '../redux/slices/videos'

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

  const handleSubmit = async(event: any) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if(ModalRef.current !== undefined && ModalRef.current !== null){
      const { openModal } = ModalRef.current
      if(data.get('email')===""){
        setMessage('Debes colocar un correo electronico para iniciar sesión')
        openModal()
      }else if(data.get('password')===""){
        setMessage('Debes colocar tu contraseña de acceso')
        openModal()
      }else{
        let loginRequest = { email: data.get('email'), password: data.get('password') }
        let rli = await apiCall(logIn, loginRequest, "", "")
        if(rli.status===200){
          let responseGetData = await apiCall(meInfo, null, rli.token, "")
          if(responseGetData.is_staff){
            setTimeout(() => {
              console.log("llegando")
              dispatch(setAuthToken(rli.token))
              dispatch(setUserInfo(responseGetData))
              dispatch(setCommissions(responseGetData.commissions))
              dispatch(setCompanies(responseGetData.companies))
              dispatch(setProjects(responseGetData.projects))
              dispatch(setUsers(responseGetData.users))
              dispatch(setVideos(responseGetData.videos))
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              //onClick={()=>{buildRequestLogin()}}
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
                <Link href="#" variant="body2">
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