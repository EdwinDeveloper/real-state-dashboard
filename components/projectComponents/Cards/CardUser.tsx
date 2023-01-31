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
import { styled } from '@mui/material/styles'
import { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface CardUserProps {
    id: string,
    name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone_number: string,
    userSelect: (id: string) => void,
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

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
          <Button onClick={()=>handleExpandClick('information')} size="small">Información</Button>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
            { action === 'investments' &&
              <Box>
                <Button size='small'>Nueva Inversión</Button>
                <Button size="small">Ver Inversiones</Button>
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