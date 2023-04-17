import React, { FC,useState, forwardRef, useImperativeHandle } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { meInfo, updateReferral } from '../../../redux/fetch/services'
import { UpdateReferralResponse, MeInfoResponse } from '../../../redux/fetch/responses'
import { setUsers } from '../../../redux/slices/users'
import { useAppDispatch } from '../../../redux/hooks'
import { useAppSelector } from '../../../redux/hooks'
import { REFERRAL_STATUS } from '../../../utils/const'
import { Referral } from '../Cards/CardReferral'
import { FetchCall } from '../../../redux/fetch/FetchCall'
import { nextStatusReferral } from '../../../utils/functions'

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

  const dispatch = useAppDispatch()

  const authToken = useAppSelector((state) => state.State.authToken)

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const reject_referral = async(referral: Referral, status: string) => {
    let newStatus = status == REFERRAL_STATUS.CANCELED ? REFERRAL_STATUS.CANCELED : nextStatusReferral(referral.status)
    let request = { status: newStatus }
    let responseReferral = await FetchCall<UpdateReferralResponse>(updateReferral(request, authToken, referral.id))
    if(responseReferral.status === 200 ){
        let meInfoResponse = await FetchCall<MeInfoResponse>(meInfo("", authToken))
        dispatch(setUsers(meInfoResponse.data.users))
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
                { ( status === REFERRAL_STATUS.IN_PROCESS || status === REFERRAL_STATUS.CONTACTED || status === REFERRAL_STATUS.RESERVED || status === REFERRAL_STATUS.SIGNED_DEED ) &&
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
                            onClick={()=>reject_referral(props.referral, REFERRAL_STATUS.ACCEPTED)}
                        >
                            Continuar
                        </Button>
                        <Button 
                            style={{
                                width: 110,
                                marginBottom: 50,
                            }} variant="outlined" color="error"
                            onClick={()=>reject_referral(props.referral, REFERRAL_STATUS.CANCELED)}
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
