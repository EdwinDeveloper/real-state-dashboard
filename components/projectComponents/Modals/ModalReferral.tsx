import React, { FC,useState, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { apiCall } from '../../../redux/fetch/management'
import { meInfo, updateReferral } from '../../../redux/fetch/services'
import { useAppSelector } from '../../../redux/hooks'
import { useDispatch } from "react-redux"
import { setUserInfo } from "../../../redux/slices/UserInfo/index"
import { REFERRAL_STATUS } from '../../../utils/const'
import { Referral } from '../Cards/CardReferral'

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

interface ModalReferralProps {
  ref: any,
    message: string,
    referral: Referral,
    setUserState: (action: string) => void,
}

const ModalReferral:FC<ModalReferralProps> = forwardRef((props,  ref: any) => {

    useImperativeHandle(ref, ()=>({
            openModal: handleOpen,
            closeModal: handleClose
        }
    ), [])

    const { status } = props.referral

  const dispatch = useDispatch()

  const authToken = useAppSelector((state) => state.State.authToken)

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const reject_referral = async(referral: Referral, status: string) => {
    let request = { status: status }
    let responseReferral = await apiCall(updateReferral, request, authToken, referral.id)
    if(responseReferral.status === 200 ){
        let refresh = await apiCall(meInfo, null, authToken, "")
        dispatch(setUserInfo(refresh))
        handleClose()
        props.setUserState('main')
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
          width: 300,
          height: 150,

        }} sx={{ ...style, width: 350 }}>
            <Typography style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }} id="modal-modal-title" variant="h6" component="h2">
                {props.message}
            </Typography>
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                { status === REFERRAL_STATUS.WAITING &&
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}>
                        <Button
                            style={{
                            backgroundColor: "#159988",
                            width: 110,
                            marginBottom: 50,
                            }}
                            variant="contained"
                            color="success"
                            onClick={()=>reject_referral(props.referral, REFERRAL_STATUS.APPROVED)}
                        >
                            Aceptar
                        </Button>
                        <Button 
                            style={{
                                width: 110,
                                marginBottom: 50,
                            }} variant="outlined" color="error"
                            onClick={()=>reject_referral(props.referral, REFERRAL_STATUS.REJECTED)}
                        >
                            Rechazar
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
      </Modal>
    </Box>
  )
})

ModalReferral.displayName="ModalReferral"

export default ModalReferral
