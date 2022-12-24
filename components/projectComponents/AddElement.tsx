import * as React from 'react'
import Button from '@mui/material/Button';
import { ValidationTextField } from '../../public/ValidationTextField'

const AddExtra = (props:any) => {
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
        const extra = {
          info, description
        }
        props.add(extra)
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
          <Button style={{backgroundColor: "#159988"}} onClick={buildModel} variant="contained" color="success">Añadir</Button>
        </div>
      </div>
    )
}

export default AddExtra