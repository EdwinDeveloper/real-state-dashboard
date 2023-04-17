import React, { FC, useState, useRef } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import { REFERRAL_STATUS, COLORS } from '../../../utils/const'
import ModalReferral from '../Modals/ModalReferral'

export interface ReferralProps {
  referral: Referral,
  setUserState: (action: string) => void,
}

export interface Referral {
  id: string,
  country_code: string,
  phone_number: string,
  gender: string,
  name: string,
  last_name: string,
  project: string,
  bonus: string,
  status: string,
}

const CardUserReferrals:FC<ReferralProps> = (props) => {

  const ModalRef = useRef<any>(null)

  const [modalMessage, setModalMessage] = useState('')

  const { name, status, last_name, bonus, country_code, phone_number } = props.referral

  let statusIcon = ''
  let statusBackgound = ''
  let message = ''

  if(status === REFERRAL_STATUS.IN_PROCESS){
    statusIcon = COLORS.REFERRAL_ICON_WAITING
    statusBackgound = COLORS.REFERRAL_BACKGROUND_WAITING
    message = 'Inversión en revisión'
  }else if (status === REFERRAL_STATUS.CONTACTED){
    statusIcon = COLORS.REFERRAL_ICON_WAITING
    statusBackgound = COLORS.REFERRAL_BACKGROUND_WAITING
    message = 'Referido contactado'
  }else if (status === REFERRAL_STATUS.RESERVED){
    statusIcon = COLORS.REFERRAL_ICON_WAITING
    statusBackgound = COLORS.REFERRAL_BACKGROUND_WAITING
    message = 'Proyecto reservado'
  }else if (status === REFERRAL_STATUS.SIGNED_DEED){
    statusIcon = COLORS.REFERRAL_ICON_WAITING
    statusBackgound = COLORS.REFERRAL_BACKGROUND_WAITING
    message = 'Contrato firmado'
  }else if (status === REFERRAL_STATUS.ACCEPTED){
    statusIcon = COLORS.REFERRAL_ICON_APPROVED
    statusBackgound = COLORS.REFERRAL_BACKGROUND_APPROVED
    message = 'Proyecto completado'
  }else if (status === REFERRAL_STATUS.PAID){
    statusIcon = COLORS.REFERRAL_ICON_APPROVED
    statusBackgound = COLORS.REFERRAL_BACKGROUND_APPROVED
    message = 'Proyecto Pagado'
  }else if (status === REFERRAL_STATUS.ACCEPTED){
    statusIcon = COLORS.REFERRAL_ICON_APPROVED
    statusBackgound = COLORS.REFERRAL_BACKGROUND_APPROVED
    message = 'Inversión completa'
  }else if (status === REFERRAL_STATUS.CANCELED){
    statusIcon = COLORS.REFERRAL_ICON_REJECTED
    statusBackgound = COLORS.REFERRAL_BACKGROUND_REJECTED
    message = 'Inversión rechazada'
  }

  return (
    <Card style={{
        width: 340,
        height: 220,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: statusBackgound,
    }} sx={{ maxWidth: 345 }}>
      <ModalReferral ref={ModalRef} message={modalMessage} setUserState={props.setUserState} referral={props.referral}/>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: statusIcon }} aria-label="recipe">
            {name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={`${name} ${last_name}`}
        subheader={`+${country_code} ${phone_number}`}
      />
      <CardContent>
        
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
        }}>
          <Typography>
            {`${message}`}
          </Typography>
          <Typography>
            {`$ ${bonus.split('.')[0]}`}
          </Typography>
        </Box>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
        }}>
          { ( status === REFERRAL_STATUS.ACCEPTED || status === REFERRAL_STATUS.PAID ) &&
              <Button onClick={()=>{}} size='small'>Inversiones</Button>
          }
          { ( status === REFERRAL_STATUS.IN_PROCESS || status === REFERRAL_STATUS.CONTACTED || status === REFERRAL_STATUS.RESERVED || status === REFERRAL_STATUS.SIGNED_DEED ) &&
              <Button onClick={()=>{
                setModalMessage('Acción a realizar ?')
                if(ModalRef.current !== undefined && ModalRef.current !== null) ModalRef.current.openModal()              
              }} size='small'>Revisar referido</Button>
          }
          { status === REFERRAL_STATUS.CANCELED &&
            <Box>
              <Button onClick={()=>{}} size='small'>Aceptar referido</Button>
            </Box>
          }
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardUserReferrals