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
import { green } from '@material-ui/core/colors'

export interface ReferralProps {
    id_referral: string,
    country_code: string,
    phone_number: string,
    gender: string,
    name: string,
    last_name: string,
    project: string,
    commission: string, 
    status: string,
}

const CardUserReferrals:FC<ReferralProps> = (props) => {

  const [expanded, setExpanded] = useState(false)
  const [action, setAction] = useState('')

  let statusIcon = ''
  let statusBackgound = ''
  let message = ''

  if(props.status === 'waiting'){
    statusIcon = '#f4d859'
    statusBackgound = '#fcf4ce'
  }else if (props.status === 'approved'){
    statusIcon = '#114039'
    statusBackgound = '#a6b6b4'
  }else if (props.status === 'rejected'){
    statusIcon = '#D82A43'
    statusBackgound = '#FFA9B5'
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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: statusIcon }} aria-label="recipe">
            {props.name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={`${props.name} ${props.last_name}`}
        subheader={`+${props.country_code} ${props.phone_number}`}
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
            {`$ ${props.commission.split('.')[0]}`}
          </Typography>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
           
          </CardContent>
      </Collapse>
      </CardContent>
    </Card>
  )
}

export default CardUserReferrals