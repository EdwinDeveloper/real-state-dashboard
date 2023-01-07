import React, { useState } from 'react'
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
import Button from '@mui/material/Button'

const Inputs = (props: any) => {

  const { commissions } = props

  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [preSalePrice, setPreSalePrice] = useState(0.0)
  const [rentPriceApproximate, setRentPriceApproximate] = useState(0.0)
  const [resalePriceApproximate, setResalePriceApproximate] = useState(0.0)
  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [premisesDeliveryDate, setPremisesDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))
  const [description, setDescription] = useState('')

  const checkModel = () => {
    let project = {
      name,
      model,
      description,
      pre_sale_price: preSalePrice,
      pre_sale_date: preSaleDate.toISOString(),
      premises_delivery_date: premisesDeliveryDate.toISOString(),
      rent_price_approximate: rentPriceApproximate,
      resale_price_approximate: resalePriceApproximate,
      commission: "df9c1ca7-b812-4a07-acd8-b402e7de4361",
      company_related: "0c57e1d3-0976-4064-a6f7-5459ae0fd0b9"
    }
    console.log(project)
  }

  const select = commissions.map((com, index)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={percentage}>{percentage}% {com.description}</MenuItem>
  })

  //console.log("inputs : ",selectCommissions)

  // const select = [
  //   <MenuItem key={1} value={12}>12% Ivarica</MenuItem>,
  //   <MenuItem key={2} value={20}>20% Hortus</MenuItem>,
  //   <MenuItem key={3} value={35}>35% General</MenuItem>
  // ]

  const companies = [
    <MenuItem key={1} value={"Gova"}>Gova</MenuItem>,
    <MenuItem key={2} value={"BBVA"}>BBVA</MenuItem>,
    <MenuItem key={3} value={"Bajio"}>Banco Bajio</MenuItem>
  ]

  const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

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
                        setPremisesDeliveryDate(premisesDeliveryDate);
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
                    value={age}
                    label="Comissión"
                    onChange={handleChange}
                  >
                    {select}
                  </Select>
                  <FormHelperText>Commissión por asignar</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Empresa"
                    onChange={handleChange}
                  >
                    {companies}
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
                <Button style={{backgroundColor: "#159988"}} onClick={checkModel} variant="contained" color="success">Check Model</Button>
            </Box>
            
          </div>
    )
}

export default Inputs