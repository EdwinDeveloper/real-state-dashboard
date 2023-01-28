import React, { FC, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ValidationTextField } from '../../public/ValidationTextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Textarea from '@mui/joy/Textarea'
import { InputProps } from '../Models/PropsComponents/InputProps'

const Inputs:FC<InputProps> = forwardRef( (props, ref: any) => {

  useImperativeHandle(ref, ()=>{
    return {
    }
  })

  const { companies, commissions } = props

  const commissionSelect = commissions.map((com: any, index: any)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={com.id}>{percentage}% {com.description}</MenuItem>
  })

  const companiesSelect = companies.map((compa: any, index: any)=>{
    return <MenuItem key={index} value={compa.id}>{compa.name}</MenuItem>
  })

    const selectCommission = (event: SelectChangeEvent) => {
      props.setIdCommission(event.target.value)
    }
    const selectCompany = (event: SelectChangeEvent) => {
      props.setIdCompany(event.target.value)
    }

    return (
        <div style={{
            width: "50%",
            height: 600,
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
                  onChange={(name)=>{props.setName(name.target.value)}}
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
                  onChange={(model)=>{props.setModel(model.target.value)}}
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
                  onChange={(preSalePrice)=>{props.setPreSalePrice(parseFloat(preSalePrice.target.value).toFixed(2))}}
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
                  onChange={(rentPriceApproximate)=>{props.setRentPriceApproximate(parseFloat(rentPriceApproximate.target.value).toFixed(2))}}
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
                  onChange={(newResalePriceApproximate)=>{props.setResalePriceApproximate(parseFloat(newResalePriceApproximate.target.value).toFixed(2))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Fecha de preventa"
                      views={['year', 'month', 'day']}
                      value={props.preSaleDate}
                      onChange={(preSaleDate) => {
                        props.setPreSaleDate(preSaleDate)
                      }}
                      renderInput={(params) =>(
                        <ValidationTextField
                          helperText="Fecha de preventa"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Fecha de entrega"
                      views={['year', 'month', 'day']}
                      value={props.premisesDeliveryDate}
                      onChange={(premisesDeliveryDate) => {
                        props.setPremisesDeliveryDate(premisesDeliveryDate)
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Commissión</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.idCommission}
                    label="Comissión"
                    onChange={selectCommission}
                  >
                    {commissionSelect}
                  </Select>
                  <FormHelperText>Commissión por asignar</FormHelperText>
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
                  <FormHelperText>Commissión por asignar</FormHelperText>
                </FormControl>
                <Textarea
                  color="neutral"
                  disabled={false}
                  minRows={2}
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