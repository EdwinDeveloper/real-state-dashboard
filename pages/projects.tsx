import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Layout from "../components/Layout"
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { styles } from '../styles/stylesJs'
import TextareaAutosize from '@mui/material/TextareaAutosize';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    color: 'white',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'white',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
})

const AddExtra = () => {
  const [info, setInfo] = React.useState('')
  const [description, setDescription] = React.useState('')

  const getInfoValue = (e: any) => {
    setInfo(e.target.value)
  }
  const getExtraValue = (e: any) => {
    setDescription(e.target.value)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%"
    }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around"
        }}>
        <div>
          <ValidationTextField
                  label="Información"
                  required
                  variant="outlined"
                  type="text"
                  helperText="Información"
                  defaultValue=""
                  placeholder='Información'
                  id="validation-outlined-input"
                  onChange={getInfoValue}
          />
        </div>
        <div>
          <ValidationTextField
                  label="Descripción"
                  required
                  variant="outlined"
                  type="text"
                  helperText="Descripción"
                  defaultValue=""
                  placeholder='Descripción'
                  id="validation-outlined-input"
                  onChange={getExtraValue}
          />
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Button variant="contained">Añadir</Button>
      </div>
    </div>
  )
}

const projects = () => {

  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [deliveryDate, setDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))

  const [details, setDetails] = React.useState([])
  const [extras, setExtras] = React.useState([])
  const [showDetails, setShowDetails] = React.useState(false) 
  const [showExtras, setShowExtras] = React.useState(false) 

  const addElement = () => {

  }

  return (
    <Layout>
      <div style={{
        width: "50%",
        height: "90vh",
      }}>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            gap: 2,
          }}
        >
            <ValidationTextField
              label="Nombre del proyecto"
              required
              variant="outlined"
              helperText="Introduce el nombre del proyecto"
              defaultValue=""
              placeholder='Nombre del proyecto'
              id="validation-outlined-input"
            />
            <ValidationTextField
              label="Nombre del modelo"
              required
              variant="outlined"
              helperText="Introduce el nombre del modelo"
              defaultValue=""
              placeholder='Nombre del modelo'
              id="validation-outlined-input"
            />
            <ValidationTextField
              label="Precio de preventa"
              required
              variant="outlined"
              type="number"
              helperText="Introduce el precio de preventa"
              defaultValue=""
              placeholder='Precio de preventa'
              id="validation-outlined-input"
            />
            <ValidationTextField
              label="Renta aproximada"
              required
              variant="outlined"
              type="number"
              helperText="Renta aproximada"
              defaultValue=""
              placeholder='Renta aproximada'
              id="validation-outlined-input"
            />
            <ValidationTextField
              label="Reventa aproximada"
              required
              variant="outlined"
              type="number"
              helperText="Reventa aproximada"
              defaultValue=""
              placeholder='Reventa aproximada'
              id="validation-outlined-input"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  label="Fecha de preventa"
                  views={['year', 'month', 'day']}
                  value={preSaleDate}
                  onChange={(newValue) => {
                    setPreSaleDate(newValue);
                  }}
                  renderInput={(params) =>(
                    <ValidationTextField
                      helperText="Fecha de preventa"
                      {...params}
                    />
                  )}
                />
                <DatePicker
                  label="Fecha de entrega"
                  views={['year', 'month', 'day']}
                  value={deliveryDate}
                  onChange={(newValue) => {
                    setDeliveryDate(newValue);
                  }}
                  renderInput={(params) =>(
                    <ValidationTextField
                      helperText="Fecha de entrega"
                      {...params}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
        </Box>
      </div>
      <div style={{
        width: "50%",
        height: "90vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",

        }}>
          <Button onClick={()=>{setShowDetails(true)}} variant="contained">Nuevo detalle</Button>
          { showDetails &&
            <div style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddExtra/>
            </div>
          }
        </div>
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",

        }}>
          <Button onClick={()=>{setShowExtras(true)}} variant="contained">Nuevo extra</Button>
          { showExtras && 
            <div style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddExtra/>
            </div>
          }
        </div>
      </div>
      
    </Layout>
  )
}

export default projects