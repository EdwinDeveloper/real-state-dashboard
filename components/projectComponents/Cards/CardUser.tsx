import React, { FC } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { setIdProjectSelected } from '../../../redux/index'
import { useDispatch } from "react-redux"

interface CardUserProps {
    id: string,
    name: string,
    last_name: string,
    email: string,
}

const CardUser:FC<CardUserProps>  = (props) => {

    const userSelected = (idUser: string) => {
        console.log(idUser)
    }
  
  return (
    <Card key={props.id} style={{
        width: "90%",
        height: 150,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderColor: "#FFFFFF",
        borderBottomColor: "#DADADA",
        borderWidth: 0.2,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        cursor: "pointer"
      }}
      sx={{ maxWidth: 300 }}
      onClick={()=>userSelected(props.id)}
    >
      <CardContent key={props.id}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {props.last_name}
        </Typography>
        <Typography style={{
          height: "14vh"
        }} variant="body2" color="text.secondary">
          {props.email}
        </Typography>
      </CardContent>
      <CardActions key={props.id}>
        <Button onClick={()=>userSelected(props.id)} size="small">Editar</Button>
      </CardActions>
    </Card>
  )
}

export default CardUser