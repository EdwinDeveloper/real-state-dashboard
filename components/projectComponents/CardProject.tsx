import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProjectCard } from '../Models/PropsComponents/PorjectCard';
import { setIdProjectSelected } from '../../redux/index'
import { useSelector as UseSelector, useDispatch } from "react-redux"

const CardProject:FC<ProjectCard>  = (props) => {

  const dispatch = useDispatch()

  const selectProject = (id: string) => {
    dispatch(setIdProjectSelected(id))
    props.stateForm('form')
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
      <CardMedia
        key={props.id}
        component="img"
        alt="green iguana"
        height="140"
        image="https://www.govacasa.mx/images/uploads/gallery/xgppw2oil988vmvju2sz2kc2a9xdsudv.jpg"
      />
      <CardContent key={props.id}>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions key={props.id}>
        <Button onClick={()=>selectProject(props.id)} size="small">Editar</Button>
      </CardActions>
    </Card>
  )
}

export default CardProject