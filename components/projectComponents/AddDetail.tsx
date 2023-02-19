import React, { FC, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { ValidationTextField } from '../../public/ValidationTextField'
import uuid from 'react-uuid';

interface DetailsProps {
  upd: any,
  add: ({})=> void,
  update: ({})=> void,
  cancel: (action: string) => void,
}

const AddDetail:FC<DetailsProps> = (props) => {
    const [keyIn, setKeyIn] = React.useState('')
    const [infoIn, setInfoIn] = React.useState('')
    const { upd } = props

    useEffect(()=>{
      const { upd } = props
      if(upd!==null){
        const { key, info, id } = upd
        setKeyIn(key)
        setInfoIn(info)
      }
    }, [])
  
    const getKeyValue = (e: any) => {
      setKeyIn(e.target.value)
    }
    const getInfoValue = (e: any) => {
      setInfoIn(e.target.value)
    }
    const buildModel = () => {
      if(keyIn != '' && infoIn != ''){
        const detail = {
          key: keyIn, info: infoIn, id: uuid()
        }
        if(upd===null){
          props.add(detail)
        }else{
          props.update({ key: keyIn, info: infoIn, id: upd.id })
        }
        
      }
    }

    const cancel = ()=> {
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
                    value={keyIn}
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
                    value={infoIn}
                    onChange={getInfoValue}
            />
          </div>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-around"
        }}>
          <Button style={{backgroundColor: "#159988"}} onClick={buildModel} variant="contained" color="success">Añadir</Button>
          <Button style={{backgroundColor: "#C2511D"}} onClick={cancel} variant="contained" color="error">Cancelar</Button>
        </div>
      </div>
    )
}

export default AddDetail