import React, { useState, FC, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import DefaultIcon from '../../icons/DefaultIcon'
import Checkbox from '@mui/material/Checkbox'

interface Amenities {
    title: string,
    icon: number,
    total: number,
    check: boolean,
    available: boolean,
    changeInt?: (value: number) => void,
    changeBol?: (value: boolean)=>void,
}

const CardAmenities:FC<Amenities>  = (props) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    
    return (
        <Card sx={styles.card}>
            <Box>
                {props.title}
            </Box>
            <Box sx={styles.elementContainer}>
                <Box>
                    <DefaultIcon title={props.title} icon={props.icon}/>
                </Box>
                { props.check
                ?
                <Box>
                    <Checkbox onChange={()=>{
                        if(props.changeBol){
                            props.changeBol(!props.available)
                        }
                    }} checked={props.available} {...label} defaultChecked color="success"/>
                </Box> 
                :
                <Box sx={styles.buttonContainer}>
                    <Button style={styles.button} onClick={()=>{
                        if(props.total > 0){
                            
                            if(props.changeInt){
                                props.changeInt(props.total - 1)
                            }
                        }
                    }}>-</Button>
                    <Box>{props.total}</Box>
                    <Button style={styles.button} onClick={()=>{
                        if(props.total < 10 ){
                            if(props.changeInt){
                                props.changeInt(props.total + 1)
                            }
                        }
                    }}>+</Button>
                </Box>
                }
            </Box>
        </Card>
    )
}

const styles = {
    card: {
        width: 180,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(232,238,240,1) 100%)",
        marginBottom: 5,
    },
    elementContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        maxWidth: 40,
        maxHeight: 40,
        minWidth: 40,
        minHeight: 40,
        color: '#159988'
    }
}

export default CardAmenities