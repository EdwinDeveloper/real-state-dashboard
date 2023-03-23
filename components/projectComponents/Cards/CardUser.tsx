import React, { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import Collapse from '@mui/material/Collapse'
import { Referral } from '../../../redux/fetch/responses'
import { Investment } from '../../../redux/fetch/responses'

interface CardUserProps {
    id: string,
    name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone_number: string,
    investments: Investment[],
    referrals: Referral[],
    userSelect: (id: string, action: string, investments: Investment[]) => void,
    userReferrals: (idUser: string, action: string, referrals: Referral[]) => void,
}

const CardUser:FC<CardUserProps> = (props) => {

  const [expanded, setExpanded] = useState(false)
  const [action, setAction] = useState('')

  const handleExpandClick = (actionIn: string) => {
    if(actionIn === action){
      setExpanded(!expanded)
    }else{
      setExpanded(true)
    }
    setAction(actionIn)
  }

  return (
    <Card style={{
        width: 340,
        height: 220,
        marginBottom: 20,
        borderRadius: 10,
    }} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={`${props.name} ${props.last_name}`}
        subheader={`${props.email}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {`Teléfono +${props.country_code} ${props.phone_number}`}
        </Typography>
        <Box style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
          <Button onClick={()=>handleExpandClick('investments')} size='small'>Inversiones</Button>
          <Button onClick={()=>handleExpandClick('payments')} size='small'>Pagos</Button>
          <Button onClick={()=>props.userReferrals(props.id, "referrals", props.referrals)} size="small">Feferidos</Button>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
            { action === 'investments' &&
              <Box>
                <Button onClick={()=>props.userSelect(props.id, "newInvestment", props.investments)} size='small'>Nueva Inversión</Button>
                <Button onClick={()=>props.userSelect(props.id, "investments", props.investments)} size="small">Ver Inversiones</Button>
            </Box>
            }
            { action === 'payments' &&
              <Box>
                <Button size='small'>Realizar pago</Button>
                <Button size="small">Listar pagos</Button>
            </Box>
            }
          </CardContent>
      </Collapse>
      </CardContent>
    </Card>
  )
}

export default CardUser