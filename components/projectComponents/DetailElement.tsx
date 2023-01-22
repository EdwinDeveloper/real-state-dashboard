import React, { FC } from 'react'
import Button from '@mui/material/Button';

const DetailElement:FC = (props:any) => {
  const { key, info } = props.element
    return (
        <div style={{
            width: "90%",
            height: 50,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}>
            <div style={{
              marginTop: 10,
                borderRadius: 5,
                borderColor: "#000000",
                borderWidth: 2,
                width: "85%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <div>
                <text>{key}</text>
              </div>
              <div>
                <text>{info}</text>
              </div>
            </div>
            <Button variant="outlined" color="error">Eliminar</Button>
          </div>
    )
}

export default DetailElement