import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Project } from '../Models/Project';

const ImgMediaCard:FC<Project>  = (props) => {
  
  return (
    <Card style={{
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
        component="img"
        alt="green iguana"
        height="140"
        image="https://www.govacasa.mx/images/uploads/gallery/xgppw2oil988vmvju2sz2kc2a9xdsudv.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard