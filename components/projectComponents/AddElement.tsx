import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Layout from "../Layout"
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { ValidationTextField } from '../../public/ValidationTextField'

const AddExtra = () => {
    const [info, setInfo] = React.useState('')
    const [description, setDescription] = React.useState('')
  
    const getInfoValue = (e: any) => {
      setInfo(e.target.value)
    }
    const getExtraValue = (e: any) => {
      setDescription(e.target.value)
    }
    const buildModel = () => {
      if(info != '' && description != ''){
        console.log({
          info, description
        })
      }
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
          <Button onClick={buildModel} variant="contained">Añadir</Button>
        </div>
      </div>
    )
}

export default AddExtra