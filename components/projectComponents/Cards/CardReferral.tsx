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

interface CardReferralProps {
    id: string,
    phone_number: string,
    gender: string,
    name: string,
    last_name: string,
    project: string,
    commission: string, 
    status: string,
}

const CardUser:FC<CardReferralProps> = (props) => {

  const [expanded, setExpanded] = useState(false)
  const [action, setAction] = useState('')

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
        subheader={`${"edwindeveloper@outlook.com"}`}
      />
      <CardContent>
        
        <Box style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
          
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

export default CardUser