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
import DefaultIcon from '../../icons/DefaultIcon'
import { Referral } from '../../../redux/fetch/responses'
import { nextStatusReferral, messageNextStatusReferral } from '../../../utils/functions'

export interface ReferralProps {
  referral: Referral,
  setUserState: (action: string) => void,
}

const CardUserReferrals:FC<ReferralProps> = (props) => {

  const ModalRef = useRef<any>(null)

  const [modalMessage, setModalMessage] = useState('')
  const [action, setAction] = useState('continue')

  const { name, status, last_name, bonus, country_code, phone_number, info_staff, created_at } = props.referral

  let statusIcon = ''
  let statusBackgound = ''
  let message = ''

  if(status === REFERRAL_STATUS.IN_PROCESS){
    statusIcon = COLORS.REFERRAL_ICON_WAITING
    statusBackgound = COLORS.REFERRAL_BACKGROUND_WAITING
    message = 'Inversión en revisión'
  }else if (status === REFERRAL_STATUS.CONTACTED){
    statusIcon = COLORS.REFERRAL_ICON_FOLLOWUP
    statusBackgound = COLORS.REFERRAL_BACKGROUND_FOLLOWUP
    message = 'Referido contactado'
  }else if (status === REFERRAL_STATUS.RESERVED){
    statusIcon = COLORS.REFERRAL_ICON_FOLLOWUP
    statusBackgound = COLORS.REFERRAL_BACKGROUND_FOLLOWUP
    message = 'Proyecto reservado'
  }else if (status === REFERRAL_STATUS.SIGNED_DEED){
    statusIcon = COLORS.REFERRAL_ICON_FOLLOWUP
    statusBackgound = COLORS.REFERRAL_BACKGROUND_FOLLOWUP
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
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: statusBackgound,
    }} sx={{ maxWidth: 345 }}>
      <ModalReferral ref={ModalRef} action={action} message={modalMessage} setUserState={props.setUserState} referral={props.referral}/>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
      }}>
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
        <Box
          onClick={()=>{
            setModalMessage('Eliminar referido ?')
            setAction("delete")
            if(ModalRef.current !== undefined && ModalRef.current !== null) ModalRef.current.openModal()              
          }}
          style={{
          cursor: 'pointer',
        }}>
          { ( status === REFERRAL_STATUS.IN_PROCESS || status === REFERRAL_STATUS.CONTACTED || status === REFERRAL_STATUS.RESERVED || status === REFERRAL_STATUS.SIGNED_DEED ) &&
            <DefaultIcon title={"Borrar"} icon={15}/>
          }
        </Box>
      </Box>
      <CardContent>
        
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
          <Typography>
            {`${message}`}
          </Typography>
          <Typography>
            {`$ ${bonus.split('.')[0]}`}
          </Typography>
        </Box>
        <Box style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center',
          width: "100%",
          marginTop: 10,
        }}>
          Asesor : { info_staff[0].name }
        </Box>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
          { ( status === REFERRAL_STATUS.ACCEPTED || status === REFERRAL_STATUS.PAID ) &&
              <>
                {/* <Button onClick={()=>{}} size='small'>Inversiones</Button> */}
              </>
          }
          { ( status === REFERRAL_STATUS.IN_PROCESS || status === REFERRAL_STATUS.CONTACTED || status === REFERRAL_STATUS.RESERVED || status === REFERRAL_STATUS.SIGNED_DEED ) &&
              <Button onClick={()=>{
                let nextStatus = nextStatusReferral(status)
                let message = nextStatus !== undefined ? messageNextStatusReferral(nextStatus) : 'Acción a realizar ?'
                message !== undefined ? setModalMessage(message) : setModalMessage('Acción a realizar ?')
                setAction("continue")
                if(ModalRef.current !== undefined && ModalRef.current !== null) ModalRef.current.openModal()              
              }} size='small'>Revisar referido</Button>
              
          }
          { status === REFERRAL_STATUS.CANCELED &&
            <Box>
              {/* <Button onClick={()=>{}} size='small'>Aceptar referido</Button> */}
            </Box>
          }
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardUserReferrals