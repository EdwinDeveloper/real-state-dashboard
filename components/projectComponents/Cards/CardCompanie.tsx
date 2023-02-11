import React, { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Companie } from '../../../pages/companies'
import CardMedia from '@mui/material/CardMedia'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'

interface CompanieProps {
  companie: Companie
}

const CardCompanie:FC<CompanieProps>  = (props) => {

  const { companie } = props
  
  return (
    <Card key={companie.id} style={{
        width: "90%",
        height: 200,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderColor: "#FFFFFF",
        borderBottomColor: "#DADADA",
        borderWidth: 0.2,
        marginTop: 20,
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    }} sx={{ maxWidth: 345 }}>
        <CardMedia
              component="img"
              style={{
                width: 100,
                height: 100,
              }}
              image={companie.icon}
              alt={companie.name}
        />
        <CardContent style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Box>
            {companie.name}
          </Box>
          <Box>
            <Button size='small'>Modificar</Button>
          </Box>
        </CardContent>
    </Card>
  )
}

export default CardCompanie