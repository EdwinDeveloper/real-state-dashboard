import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CommissionCard } from '../../Models/PropsComponents/CommissionCard'

const CardCommission:FC<CommissionCard>  = (props) => {
  
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
      Si we si
    </Card>
  )
}

export default CardCommission