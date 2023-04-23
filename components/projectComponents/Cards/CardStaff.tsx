import React, { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MeInfoResponse, User } from '../../../redux/fetch/responses'
import { red } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox';
import { changeActiveStatus } from '../../../redux/fetch/services'
import { FetchCall } from '../../../redux/fetch/FetchCall'
import { useAppSelector } from '../../../redux/hooks'
import { useAppDispatch } from '../../../redux/hooks'
import { setStaff } from '../../../redux/slices/users'

interface StaffProps {
    member: User,
    staff: User[],
}

const CardStaff:FC<StaffProps> = ({ member, staff }) => {

    const dispatch = useAppDispatch()

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const { id, name, last_name, email, country_code, phone_number, is_active } = member
    const { authToken } = useAppSelector((state)=>state.State)

    const [isActive, setIsActive] = useState<boolean>(is_active)

    const handleCheckboxChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        let request = {
            id: id,
            is_active: event.target.checked
        }
        let response = await FetchCall<MeInfoResponse>(changeActiveStatus(request, authToken))
        
        if(response.status === 200){
            setIsActive(response.data.is_active);
            handleStaffUpdate(response.data.is_active)
        }
    }

    const handleStaffUpdate = (active: boolean) => {
        let newArray = staff
        let updateMember = newArray.filter(single => single.id !== member.id)
        let newOne = {...member}
        newOne['is_active'] = active
        updateMember.push(newOne)
        dispatch(setStaff(updateMember))
    }

    return (
        <Card style={{
            width: 340,
            height: 220,
            marginBottom: 20,
            borderRadius: 10,
        }} sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {name.substring(0, 1)}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                </IconButton>
                }
                title={`${name} ${last_name}`}
                subheader={`${email}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`Teléfono +${country_code} ${phone_number}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Staff Activo
                    <Checkbox onChange={handleCheckboxChange} checked={isActive} {...label} defaultChecked color="success"/>
                </Typography>
                {/* <Button variant="contained" color="success">Actualizar</Button> */}
            </CardContent>
        </Card>
    )
}

export default CardStaff