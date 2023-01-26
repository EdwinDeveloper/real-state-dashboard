import React, { FC, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
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
import { Project } from '../Models/Project'

const Inputs:FC = forwardRef( (props: any, ref: any) => {

  useImperativeHandle(ref, ()=>{
    return {
      inputForm: inputForm,
      cleanParams: cleanParams,
      updateParameters: updateParameters,
    }
  })

  const { companies, commissions } = props

  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [preSalePrice, setPreSalePrice] = useState("")
  const [rentPriceApproximate, setRentPriceApproximate] = useState("")
  const [resalePriceApproximate, setResalePriceApproximate] = useState("")
  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [premisesDeliveryDate, setPremisesDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))
  const [description, setDescription] = useState('')
  const [idComission, setIdCommission] = useState('')
  const [idCompany, setIdCompany] = useState('')

  const cleanParams = () => {
    setName('')
    setModel('')
    setPreSalePrice('')
    setRentPriceApproximate('')
    setResalePriceApproximate('')
    setPreSaleDate(dayjs(''))
    setPremisesDeliveryDate(dayjs(''))
    setDescription('')
    setIdCommission('')
    setIdCompany('')
  }

  const updateParameters = (project: Project) => {
    setName(project.name)
    setModel(project.model)
    setPreSalePrice(project.pre_sale_price.toString())
    setRentPriceApproximate(project.rent_price_approximate.toString())
    setResalePriceApproximate(project.resale_price_approximate.toString())
    setPreSaleDate(dayjs(project.pre_sale_date))
    setPremisesDeliveryDate(dayjs(project.premises_delivery_date))
    setDescription(project.description)
    setIdCommission(project.commission)
    setIdCompany(project.company_related)
  }

  const inputForm = () => {
    let project = {
      name,
      model,
      description,
      pre_sale_price: preSalePrice,
      pre_sale_date: preSaleDate,
      premises_delivery_date: premisesDeliveryDate,
      rent_price_approximate: rentPriceApproximate,
      resale_price_approximate: resalePriceApproximate,
      commission: idComission,
      company_related: idCompany
    }
    return project
  }

  const commissionSelect = commissions.map((com: any, index: any)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={com.id}>{percentage}% {com.description}</MenuItem>
  })

  const companiesSelect = companies.map((compa: any, index: any)=>{
    return <MenuItem key={index} value={compa.id}>{compa.name}</MenuItem>
  })

    const selectCommission = (event: SelectChangeEvent) => {
      setIdCommission(event.target.value)
    }
    const selectCompany = (event: SelectChangeEvent) => {
      setIdCompany(event.target.value)
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
                  onChange={(name)=>{setName(name.target.value)}}
                />
                <ValidationTextField
                  label="Nombre del modelo"
                  required
                  variant="outlined"
                  helperText="Introduce el nombre del modelo"
                  defaultValue=""
                  placeholder='Nombre del modelo'
                  id="validation-outlined-input"
                  onChange={(model)=>{setModel(model.target.value)}}
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
                  onChange={(preSalePrice)=>{setPreSalePrice(parseFloat(preSalePrice.target.value).toFixed(2))}}
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
                  onChange={(rentPriceApproximate)=>{setRentPriceApproximate(parseFloat(rentPriceApproximate.target.value).toFixed(2))}}
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
                  onChange={(newResalePriceApproximate)=>{setResalePriceApproximate(parseFloat(newResalePriceApproximate.target.value).toFixed(2))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Fecha de preventa"
                      views={['year', 'month', 'day']}
                      value={preSaleDate}
                      onChange={(preSaleDate) => {
                        setPreSaleDate(preSaleDate)
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
                      value={premisesDeliveryDate}
                      onChange={(premisesDeliveryDate) => {
                        setPremisesDeliveryDate(premisesDeliveryDate)
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
                    value={idComission}
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
                    value={idCompany}
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
                  onChange={(description)=>{setDescription(description.target.value)}}
                />
            </Box>
            
          </div>
    )
})

Inputs.displayName = "Inputs"

export default Inputs