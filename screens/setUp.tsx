import React, { useEffect, useRef, useState} from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { setState } from '../redux/slices/state'
import { useAppDispatch } from '../redux/hooks'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material'
import { emailValidator, passvalidator } from '../utils/functions'
import { FetchCall } from '../redux/fetch/FetchCall'
import { setup } from '../redux/fetch/services'
import { MeInfoResponse } from '../redux/fetch/responses'
import CircularProgress from '@mui/material/CircularProgress'

const theme = createTheme()

const SignUp = () => {

  const [screen, setScreen] = useState('FORM')

  const [countryCode, setCountryCode] = useState('N')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('S')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()

  useEffect(()=>{
    resetValues()
    
  }, [])

  const ModalRef = useRef<any>()

  const resetValues = () => {
    setCountryCode('N')
    setPhoneNumber('')
    setGender('S')
    setName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async() => {
    if(ModalRef.current !== undefined && ModalRef.current !== null){
      const { openModal } = ModalRef.current

      console.log("name : ", name);
      

      if(name===''){
        setMessage('El nombre de usuario es requerido')
        openModal()
      }else if(lastName===''){
        setMessage('El apellido es requerido')
        openModal()
      }else if(email===''){
        setMessage('El correo electronico es requerido')
        openModal()
      }else if(password===''){
        setMessage('La contraseña es requerida')
        openModal()
      }else if(confirmPassword===''){
        setMessage('Es necesario confirmar la contraseña')
        openModal()
      }else if(password !== confirmPassword){
        setMessage('Las contraseñas no son iguales')
        openModal()
      }else if(!passvalidator(password)){
        setMessage('La contraseña no es segura, asegurese que tenga una letra mayuscula, un número y un caracter especial')
        openModal()
      }else if(!emailValidator(email)){
        setMessage('El email introducido no es valido')
        openModal()
      }else if(gender==='S'){
        setMessage('Es necesario confirmar el genero')
        openModal()
      }else if(phoneNumber.length<7){
        setMessage('Numero telefonico incompleto')
        openModal()
      }else if(countryCode==='N'){
        setMessage('Selecciona el código de páis')
        openModal()
      }else {
        let request = {
          country_code: countryCode,
          phone_number: phoneNumber,
          gender: gender,
          name: name,
          last_name: lastName,
          email: email,
          password: password,
          is_staff: true,
          is_active: false
        }
        setScreen('SAVING')
        let response = await FetchCall<MeInfoResponse>(setup(request, ''))
        if(response.status === 201){
          setMessage("Usuario Creado")
          openModal()
          setTimeout(() => {
            setScreen('FORM')
            dispatch(setState(1))
          }, 1000);
        }else {
          setMessage(response.messages[0].value)
          openModal()
          setTimeout(() => {
            setScreen('FORM')
          }, 200);
        }
      }
    }
  }

  const handleSelectGender = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value)
  }

  const handleCountryCode = ( event: SelectChangeEvent<string> ) => {
    setCountryCode(event.target.value)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    if(numericValue.length <= 15){
      setPhoneNumber(numericValue)
    }
  }

  const handleInputInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    if(numericValue.length <= 15){
      setPhoneNumber(numericValue)
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
            Nuevo Usuario
          </Typography>
          <Box sx={{ mt: 1 }}>
              { screen === 'SAVING' && 
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
                    id="name"
                    label="Nombre(s)"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={(event)=>{
                      console.log(event.target.value)
                      setName(event.target.value)
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Apellidos"
                    name="last_name"
                    autoComplete="last_name"
                    autoFocus
                    onChange={(event)=>setLastName(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    autoComplete="password"
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirmar Contraseña"
                    type="password"
                    id="confirmpassword"
                    autoComplete="confirmpassword"
                    onChange={(event)=>setConfirmPassword(event.target.value)}
                  />
                  <Box>
                    <InputLabel>{"Genero"}</InputLabel>
                    <Select
                      labelId="select-gender-label"
                      id="select-gender"
                      value={gender}
                      label="Genero"
                      onChange={handleSelectGender}
                    >
                      <MenuItem value={'S'}>Selecciona un genero</MenuItem>
                      <MenuItem value={'M'}>Masculino</MenuItem>
                      <MenuItem value={'F'}>Femenino</MenuItem>
                      <MenuItem value={'O'}>Otro</MenuItem>
                    </Select>
                  </Box>
                  <Box>
                    <InputLabel>{"Código de país"}</InputLabel>
                    <Select
                      labelId="country-code-label"
                      id="country-code"
                      value={countryCode}
                      label="CountryCode"
                      onChange={handleCountryCode}
                    >
                      <MenuItem value={'N'}>Código de país</MenuItem>
                      <MenuItem value={'52'}>México</MenuItem>
                      <MenuItem value={'1'}>USA</MenuItem>
                    </Select>
                  </Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phonenumber"
                    label="Número télefonico"
                    type="phonenumber"
                    id="phonenumber"
                    autoComplete="phonenumber"
                    onChange={handleInputChange}
                    onInput={handleInputInput}
                    variant="outlined"
                    value={phoneNumber}
                    inputProps={{
                      inputMode: 'numeric', // Set inputMode to "numeric"
                      pattern: '[0-9]*', // Set pattern to only allow numeric values
                    }}
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
                    onClick={()=>handleSubmit()}
                  >
                    Guardar
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: "#000000"
                    }}
                    color="secondary"
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

export default SignUp