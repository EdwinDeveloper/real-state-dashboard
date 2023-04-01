import React, { FC, useRef } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import { Bonus } from '../../../redux/fetch/responses'

interface BonusProps {
    bonus: Bonus,
    activateForm: (screen: string) => void,
    updateBonus: (bonus: Bonus) => void,
}

const CardBonuses:FC<BonusProps> = (props) => {

    const { bonus, activateForm, updateBonus } = props

    const Modal = useRef(null)

    return (
        <Card key={bonus.id} style={{
            width: 250,
            height: 120,
            marginBottom: 20,
            borderRadius: 10,
        }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {bonus.description.substring(0, 1)}
                </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title={`${bonus.percentage}`}
                subheader={`${bonus.description}`}
            />
            <CardContent style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                }}>
                <Box>
                    <Button onClick={()=>updateBonus(bonus)} size='small'>Modificar</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardBonuses