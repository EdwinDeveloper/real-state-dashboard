import React, { FC,useState, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import { createInvestment } from '../../../redux/fetch/services'
import { apiCall } from '../../../redux/fetch/management'
import { useSelector as UseSelector } from "react-redux"
import { SelectAppState, refreshGlobalInfo } from '../../../redux/index'

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
    id: string,
    userId: string,
    message: string,
    function: (id: string)=>void,
}

const ModalConfirmation:FC<ModalConfirmationProps> = forwardRef((props,  ref: any) => {

    useImperativeHandle(ref, ()=>({
            openModal: handleOpen,
            closeModal: handleClose
        }
    ), [])

  const AppState = UseSelector(SelectAppState)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(props.message)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const ci = async(project_id: string, user_id: string) => {
    setMessage("Creando inversión")
    let request = {
      user_id, investment_id: project_id
    }
    setTimeout(async() => {
      let response = await apiCall(createInvestment, request, AppState.authToken, user_id)
      if(response.message === "Investment created"){
        handleClose()
        // refreshGlobalInfo()
      }
    }, 1000);
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
                     <Button
                        style={{
                          backgroundColor: "#159988",
                          width: 130,
                          marginBottom: 50,
                        }}
                          variant="contained"
                          color="success"
                          onClick={()=>{ci(props.id, props.userId)}}
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
                }
            </Typography>
        </Box>
      </Modal>
    </Box>
  )
})

export default ModalConfirmation
