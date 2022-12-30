import * as React from 'react'
import Button from '@mui/material/Button';
import { ValidationTextField } from '../../public/ValidationTextField'

const AddExtra = (props:any) => {
    const [key, setKey] = React.useState('')
    const [info, setInfo] = React.useState('')
  
    const getKeyValue = (e: any) => {
      setKey(e.target.value)
    }
    const getInfoValue = (e: any) => {
      setInfo(e.target.value)
    }
    const buildModel = () => {
      if(key != '' && info != ''){
        const extra = {
          key, info
        }
        props.add(extra)
      }
    }

    const ca = ()=> {
      props.cancel("details")
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
                    onChange={getKeyValue}
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
                    onChange={getInfoValue}
            />
          </div>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-around"
        }}>
          <Button style={{backgroundColor: "#159988"}} onClick={buildModel} variant="contained" color="success">Añadir</Button>
          <Button style={{backgroundColor: "#C2511D"}} onClick={ca} variant="contained" color="error">Cancelar</Button>
        </div>
      </div>
    )
}

export default AddExtra