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

interface ModalUserStaffProps {
  ref: any,
  handleMakeStaffChange: (staff: boolean)=>void,
}

const ModalUserStaff:FC<ModalUserStaffProps> = forwardRef((props,  ref: any) => {

    useImperativeHandle(ref, ()=>({
            openModal: handleOpen,
            closeModal: handleClose
        }
    ), [])

  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
                    <Box style={{
                      width: "100%",
                    }}>
                          <Box style={{
                            textAlign: "justify"
                          }}>
                            ¿ Dar permisos de administrador a este usuario ?
                          </Box>
                          <Box style={{
                            display: 'flex',
                            width: "100%",
                            justifyContent: "space-between",
                            marginTop: 20,
                          }}>
                              <Button
                                style={{
                                  backgroundColor: "#159988",
                                  width: 110,
                                  marginBottom: 50,
                                }}
                                variant="contained"
                                  color="success"
                                  onClick={()=>{
                                    props.handleMakeStaffChange(true)
                                    setOpen(false)
                                  }}
                              >
                                Aceptar
                              </Button>
                              <Button 
                                style={{
                                  width: 110,
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

ModalUserStaff.displayName="ModalUserStaff"

export default ModalUserStaff
