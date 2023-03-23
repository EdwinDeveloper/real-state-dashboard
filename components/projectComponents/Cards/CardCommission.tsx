import React, { FC, useRef } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import { Commission } from '../../../pages/commissions'

interface CommissionProps {
    commission: Commission,
    activateForm: (screen: string) => void,
    updateCommission: (commission: Commission) => void,
}

const CardCommissions:FC<CommissionProps> = (props) => {

    const { commission, activateForm, updateCommission } = props

    const Modal = useRef(null)

    return (
        <Card key={commission.id} style={{
            width: 250,
            height: 120,
            marginBottom: 20,
            borderRadius: 10,
        }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {commission.description.substring(0, 1)}
                </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title={`${commission.percentage}`}
                subheader={`${commission.description}`}
            />
            <CardContent style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                }}>
                <Box>
                    <Button onClick={()=>updateCommission(commission)} size='small'>Modificar</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardCommissions