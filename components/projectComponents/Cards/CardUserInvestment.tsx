import React, { FC, useRef } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Image } from '../../../redux/fetch/responses'
import ModalConfirmation from '../Modals/ModalConfirmation'
import Box from '@material-ui/core/Box'

interface CardUserInvestmentProps {
    projectId: string,
    userId: string,
    name: string,
    model: string,
    action: string,
    images: Image[],
    description: string,

    pre_sale_price: number,

    bonus: string,
    status: string,
}

const CardUserProject:FC<CardUserInvestmentProps>  = (props) => {

  const ModalConf = useRef<any>(null)

  const createInvestment = () => {

  }
  
  return (
    <Card key={props.projectId} style={{
        width: "90%",
        height: 480,
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
        projectId={props.projectId}
        userId={props.userId}
        pre_sale_price={props.pre_sale_price}
        message={"Crear inversión ? "}
        function={createInvestment}
      />
      <CardMedia
        key={props.projectId}
        component="img"
        alt="green iguana"
        style={{
          height: 230
        }}
        image={props.images[0].url}
      />
      <CardContent key={props.projectId}>
        <Typography gutterBottom variant="h5" component="div">
          {props.model}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography style={{
          height: "8vh"
        }} variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions style={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }} key={props.projectId}>
        { props.action === 'investments' &&
          <Box>
            <Box>
              Comisión
            </Box>
            <Box>
              {props.bonus}
            </Box>
          </Box>
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