import React, { FC, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import { ValidationTextField } from '../../public/ValidationTextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Textarea from '@mui/joy/Textarea'
import { InputProps } from '../Models/PropsComponents/InputProps'
import TextField from '@mui/material/TextField'

const Inputs:FC<InputProps> = forwardRef( (props, ref: any) => {

  useImperativeHandle(ref, ()=>{
    return {
    }
  })

  const { companies, bonuses } = props

  const bonusSelect = bonuses !== undefined ? bonuses.map((com: any, index: any)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={com.id}>{percentage}% {com.description}</MenuItem>
  }) : []

  const companiesSelect = companies !== undefined ? companies.map((compa: any, index: any)=>{
    return <MenuItem key={index} value={compa.id}>{compa.name}</MenuItem>
  }) : []

    const selectBonus = (event: SelectChangeEvent) => {
      props.setIdBonus(event.target.value)
    }
    const selectCompany = (event: SelectChangeEvent) => {
      props.setIdCompany(event.target.value)
    }

    return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
            width: "50%",
            height: 900,
            marginTop: 70,
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
                  value={props.name}
                  onChange={(name: any)=>{props.setName(name.target.value)}}
                />
                <ValidationTextField
                  label="Nombre del modelo"
                  required
                  variant="outlined"
                  helperText="Introduce el nombre del modelo"
                  defaultValue=""
                  placeholder='Nombre del modelo'
                  id="validation-outlined-input"
                  value={props.model}
                  onChange={(model: any)=>{props.setModel(model.target.value)}}
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
                  value={props.preSalePrice}
                  onChange={(preSalePrice: any)=>{props.setPreSalePrice(parseFloat(preSalePrice.target.value).toFixed(2))}}
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
                  value={props.rentPriceApproximate}
                  onChange={(rentPriceApproximate: any)=>{props.setRentPriceApproximate(parseFloat(rentPriceApproximate.target.value).toFixed(2))}}
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
                  value={props.resalePriceApproximate}
                  onChange={(newResalePriceApproximate: any)=>{props.setResalePriceApproximate(parseFloat(newResalePriceApproximate.target.value).toFixed(2))}}
                />
                <TextField
                  id="outlined-basic"
                  type="date"
                  helperText="Reventa aproximada"
                  variant="outlined"
                  value={props.preSaleDate}
                  onChange={(preSaleDate)=>{props.setPreSaleDate(preSaleDate.target.value)}}
                />
                <TextField
                  id="outlined-basic"
                  type="date"
                  helperText="Fecha de entrega"
                  variant="outlined"
                  value={props.premisesDeliveryDate}
                  onChange={(premisesDeliveryDate)=>{props.setPremisesDeliveryDate(premisesDeliveryDate.target.value)}}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Bonus</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.idBonus}
                    label="Comissión"
                    onChange={selectBonus}
                  >
                    {bonusSelect}
                  </Select>
                  <FormHelperText>Bonus por asignar</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.idCompany}
                    label="Empresa"
                    onChange={selectCompany}
                  >
                    {companiesSelect}
                  </Select>
                  <FormHelperText>Bonus por asignar</FormHelperText>
                </FormControl>
                <Textarea
                  color="neutral"
                  disabled={false}
                  minRows={2}
                  maxRows={6}
                  placeholder="Descripción"
                  size="md"
                  variant="outlined"
                  value={props.description}
                  onChange={(description)=>{props.setDescription(description.target.value)}}
                />
            </Box>
            
          </div>
    )
})

Inputs.displayName = "Inputs"

export default Inputs