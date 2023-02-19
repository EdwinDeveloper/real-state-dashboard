import React, { FC } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { VideoCard } from '../../Models/PropsComponents/VideoCard'

const CardVideo:FC<VideoCard>  = (props) => {
  
  return (
    <Card key={""} style={{
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
      <CardMedia
        key={""}
        component="img"
        alt="green iguana"
        style={{
          height: "23vh"
        }}
        image={""}
      />
      <CardContent key={""}>
        <Typography gutterBottom variant="h5" component="div">
          {""}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {""}
        </Typography>
        <Typography style={{
          height: "14vh"
        }} variant="body2" color="text.secondary">
          {""}
        </Typography>
      </CardContent>
      <CardActions key={""}>
        <Button onClick={()=>{}} size="small">Editar</Button>
      </CardActions>
    </Card>
  )
}

export default CardVideo