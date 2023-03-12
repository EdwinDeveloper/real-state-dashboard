import React, { FC, useRef } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Image } from '../../../redux/fetch/responses'
import ModalConfirmation from '../Modals/ModalConfirmation'

interface CardUserProjectProps {
    id: string,
    userId: string,
    name: string,
    model: string,
    action: string,
    images: Image[],
    description: string,
}

const CardUserProject:FC<CardUserProjectProps>  = (props) => {

  const ModalConf = useRef<any>(null)

  const createInvestment = () => {

  }
  
  return (
    <Card key={props.id} style={{
        width: "90%",
        height: 450,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderColor: "#FFFFFF",
        borderBottomColor: "#DADADA",
        borderWidth: 0.2,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    }} sx={{ maxWidth: 345 }}>
      <ModalConfirmation 
        ref={ModalConf}
        id={props.id}
        userId={props.userId}
        message={"Crear inversión ? "}
        function={createInvestment}
      />
      <CardMedia
        key={props.id}
        component="img"
        alt="green iguana"
        style={{
          height: "23vh"
        }}
        image={props.images[0].url}
      />
      <CardContent key={props.id}>
        <Typography gutterBottom variant="h5" component="div">
          {props.model}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography style={{
          height: "10vh"
        }} variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions style={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }} key={props.id}>
        { props.action === 'investments'

        }
        { props.action === 'newInvestment' &&
            <Button onClick={()=>{
              if(ModalConf.current !== undefined && ModalConf.current !== null) ModalConf.current.openModal()              
            }} size='small'>Seleccionar Inversión</Button>
        }
      </CardActions>
    </Card>
  )
}

export default CardUserProject