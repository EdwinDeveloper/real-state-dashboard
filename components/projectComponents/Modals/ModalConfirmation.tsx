import React, { FC,useState, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import { createInvestment, meInfo } from '../../../redux/fetch/services'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { FetchCall } from '../../../redux/fetch/FetchCall';
import { CreateInvestmentResponse, MeInfoResponse, Bonus } from '../../../redux/fetch/responses';
import { CreateInvestment } from '../../../redux/fetch/requests';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import { setUsers } from '../../../redux/slices/users';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 5,
}

interface ModalConfirmationProps {
  ref: any,
    projectId: string,
    userId: string,
    message: string,
    pre_sale_price: number,
    function: (id: string)=>void,
}

const ModalConfirmation:FC<ModalConfirmationProps> = forwardRef((props,  ref: any) => {

  const bonusesList = useAppSelector((state)=>state.bonuses.bonuses)

  const bonuses: Bonus[] = bonusesList

  const bonusSelect = bonuses !== undefined ? bonuses.map((com: Bonus, index: any)=>{
    let percentage = parseFloat(com.percentage)
    return <MenuItem key={index} value={com.percentage}>{percentage}% {com.description}</MenuItem>
  }) : []

  const [selectBonus, setSelectBonus] = useState('')

  const selectBonusSelected = (event: SelectChangeEvent) => {
    setSelectBonus(event.target.value)
  }

    useImperativeHandle(ref, ()=>({
            openModal: handleOpen,
            closeModal: handleClose
        }
    ), [])

  const dispatch = useAppDispatch()

  const authToken = useAppSelector((state)=> state.State.authToken)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(props.message)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const ci = async(projectId: string, user_id: string) => {
    if(selectBonus == ''){
      setMessage("Seleccione una comisión")
    }else {
      let bonus_ = parseFloat(selectBonus) * props.pre_sale_price

      let request: CreateInvestment = {
        bonus: bonus_.toString(),
        user_id,
        project: projectId
      }
      setMessage("Creando inversión")
      setTimeout(async() => {
        let response = await FetchCall<CreateInvestmentResponse>(createInvestment(request, authToken))
        if(response.status === 201){
          handleClose()
          let responseMeInfo = await FetchCall<MeInfoResponse>(meInfo(null, authToken))
          dispatch(setUsers(responseMeInfo.data.users))
        }
      }, 1000);
    }
  }

  return (
    <Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

        }} sx={{ ...style, width: 350 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {message}
            </Typography>
            <Typography style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }} id="modal-modal-title" variant="h6" component="h2">
                { message === 'Creando inversión' &&
                  <CircularProgress />
                }
                { message !== 'Creando inversión' &&
                  <Box>
                    <Box>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectBonus}
                        label="Empresa"
                        onChange={selectBonusSelected}
                      >
                        {bonusSelect}
                      </Select>
                      <FormHelperText>Bonus por asignar</FormHelperText>
                    </FormControl>
                    </Box>
                    <Box>
                      <Button
                        style={{
                          backgroundColor: "#159988",
                          width: 130,
                          marginBottom: 50,
                        }}
                        variant="contained"
                          color="success"
                          onClick={()=>{ci(props.projectId, props.userId)}}
                      >
                        Aceptar
                      </Button>
                      <Button 
                        style={{
                          width: 130,
                          marginBottom: 50,
                        }} variant="outlined" color="error"
                          onClick={()=>handleClose()}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Box>
                }
            </Typography>
        </Box>
      </Modal>
    </Box>
  )
})

ModalConfirmation.displayName="ModalConfirmation"

export default ModalConfirmation
