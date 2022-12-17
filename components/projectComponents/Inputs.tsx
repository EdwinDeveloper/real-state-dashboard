import * as React from 'react'
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
import FormHelperText from '@mui/material/FormHelperText';

const Inputs = (props: any) => {

  const select = [
    <MenuItem value={12}>12% Ivarica</MenuItem>,
    <MenuItem value={20}>20% Hortus</MenuItem>,
    <MenuItem value={35}>35% General</MenuItem>
  ]

  const companies = [
    <MenuItem value={"Gova"}>Gova</MenuItem>,
    <MenuItem value={"BBVA"}>BBVA</MenuItem>,
    <MenuItem value={"Bajio"}>Banco Bajio</MenuItem>
  ]

  const [age, setAge] = React.useState('');

    const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
    const [deliveryDate, setDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))

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
                  </Stack>
                </LocalizationProvider>
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
            </Box>
            
          </div>
    )
}

export default Inputs