import React, { useEffect, useRef, useState} from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ModalPer from '../components/projectComponents/Modals/ModalPer'

import CircularProgress from '@mui/material/CircularProgress'
import { useAppDispatch } from '../redux/hooks'
import { setState } from '../redux/slices/state'
import { emailValidator } from '../utils/functions'
import { EmailResetPassword } from '../redux/fetch/requests'
import { FetchCall } from '../redux/fetch/FetchCall'
import { ResetPasswordResponse } from '../redux/fetch/responses'
import { emailResetPassword } from '../redux/fetch/services'

    const theme = createTheme()

const ResetPass = () => {

    const dispatch = useAppDispatch()

    const [screen, setScreen] = useState('FORM')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')


    useEffect(()=>{

    }, [])

  const ModalRef = useRef<any>()

  const handleSubmit = async() => {
    if(ModalRef.current !== undefined && ModalRef.current !== null){
        const { openModal } = ModalRef.current
        if(!emailValidator(email)){
            setMessage('Correo electronico no valido')
            openModal()
        }else{
            setScreen("SENDING")
            let request: EmailResetPassword = {
                email: email
            }
            let responseEmail = await FetchCall<ResetPasswordResponse>(emailResetPassword(request, ""))
            if(responseEmail.status === 200){
                setScreen("FORM")
                setMessage(responseEmail.data.message)
                setEmail('')
            }else{
                setScreen("FORM")
                setMessage(responseEmail.messages[0].value)
                setEmail('')
            }
        }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalPer ref={ModalRef} title={"Nuevo Usuario"} message={message}/>
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
          <Typography component="h1" variant="h5">
            Recuperar contraseña
          </Typography>
          <Typography component="h1" variant="h5">
            {message}
          </Typography>
          <Box sx={{ mt: 1 }}>
              { screen === 'SENDING' && 
                <Box>
                  <CircularProgress />
              </Box>
              }
              { screen === 'FORM' &&
                  <Box id="form" >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: "#000000"
                    }}
                    color="success"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>handleSubmit()}
                  >
                    Enviar
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    color="success"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>{
                        dispatch(setState(1))
                    }}
                  >
                    Cancelar
                  </Button>
                  
                </Box>
              }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ResetPass