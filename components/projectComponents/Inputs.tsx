import React, { useState, forwardRef, useImperativeHandle } from 'react'
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal = (props: any) => {

  const { message, title } = props

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
        </Typography>
        </Box>
    </Modal>
    </div>
  )
}

const Inputs = forwardRef( (props: {}, ref: ForwardedRef<unknown>) => {

  useImperativeHandle(ref, ()=>{
    return {
      inputForm: inputForm
    }
  })

  const { checkForm, companies, commissions, take_info } = props

  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [preSalePrice, setPreSalePrice] = useState(0.0)
  const [rentPriceApproximate, setRentPriceApproximate] = useState(0.0)
  const [resalePriceApproximate, setResalePriceApproximate] = useState(0.0)
  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [premisesDeliveryDate, setPremisesDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))
  const [description, setDescription] = useState('')
  const [idComission, setIdCommission] = useState('')
  const [idCompany, setIdCompany] = useState('')

  const inputForm = () => {
    let project = {
      name,
      model,
      description,
      pre_sale_price: preSalePrice,
      //pre_sale_date: preSaleDate.toISOString(),
      //premises_delivery_date: premisesDeliveryDate.toISOString(),
      pre_sale_date: preSaleDate,
      premises_delivery_date: premisesDeliveryDate,
      rent_price_approximate: rentPriceApproximate,
      resale_price_approximate: resalePriceApproximate,
      commission: idComission,
      company_related: idCompany
    }
    return project
  }

  const commissionSelect = commissions.map((com, index)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={com.id}>{percentage}% {com.description}</MenuItem>
  })

  const companiesSelect = companies.map((compa, index)=>{
    return <MenuItem key={index} value={compa.id}>{compa.description}</MenuItem>
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

export default Inputs