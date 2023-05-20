import React, { FC, useState, useRef } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MeInfoResponse, User } from '../../../redux/fetch/responses'
import { red } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import { useAppSelector } from '../../../redux/hooks'
import { useAppDispatch } from '../../../redux/hooks'
import { FetchCall } from '../../../redux/fetch/FetchCall'
import { changeActiveStatus, makeUserStaff } from '../../../redux/fetch/services'
import { setStaff, setUsers } from '../../../redux/slices/users'
import ModalUserStaff from '../Modals/ModalUserStaff'

interface UserStaffProps {
    member: User,
    staff: User[],
    users: User[],
}

const CardUserStaff:FC<UserStaffProps> = ({ member, staff, users }) => {

    const dispatch = useAppDispatch()
    const ModalRef = useRef<any>(null)

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    
    const { id, name, last_name, email, country_code, phone_number, is_active, is_staff } = member
    const { authToken } = useAppSelector((state)=>state.State)
    let isStaffCheck: boolean = is_staff ? true : false
    const [isStaff, setIsStaff] = useState<boolean>(isStaffCheck)
    const [isActive, setIsActive] = useState<boolean>(is_active)

    const handleActiveChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        let request = {
            id: id,
            is_active: event.target.checked
        }
        let response = await FetchCall<MeInfoResponse>(changeActiveStatus(request, authToken))
        if(response.status === 200){
            setIsActive(response.data.is_active);
            handleActiveUpdate(response.data.is_active)
        }
    }

    const handleActiveUpdate = (active: boolean) => {
        let newArray = users
        let updateMember = newArray.filter(single => single.id !== member.id)
        let newOne = {...member}
        newOne['is_active'] = active
        updateMember.push(newOne)
        const sortedUsers = updateMember.slice().sort((a, b)=> a.name.localeCompare(b.name) )
        dispatch(setUsers(sortedUsers))
    }

    const handleModalVerification = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(ModalRef.current !== undefined && ModalRef.current !== null) ModalRef.current.openModal() 
    }

    const handleMakeStaffChange = async(staff: boolean) => {
        let request = {
            id: id,
            is_staff: staff
        }
        
        let response = await FetchCall<MeInfoResponse>(makeUserStaff(request, authToken))
        if(response.status === 200){
            setIsStaff(response.data.is_active);
            handleStaffUpdate(response.data.is_active)
        }
    }

    const handleStaffUpdate = (isStaff: boolean) => {
        let newArrayUsers = users
        let newArrayStaff = staff

        let updateMemberUsers = newArrayUsers.filter(single => single.id !== member.id)
        let updateMemberStaff = newArrayStaff.filter(single => single.id !== member.id)

        let newStaff = {...member}

        newStaff['is_staff'] = isStaff
    
        updateMemberStaff.push(newStaff)

        const sortedMemberUsers = updateMemberUsers.slice().sort((a, b)=> a.name.localeCompare(b.name) )
        const sortedMemberStaff = updateMemberStaff.slice().sort((a, b)=> a.name.localeCompare(b.name) )

        dispatch(setUsers(sortedMemberUsers))
        dispatch(setStaff(sortedMemberStaff))
    }

    return (
        <Card style={{
            width: 340,
            height: 220,
            marginBottom: 20,
            borderRadius: 10,
        }} sx={{ maxWidth: 345 }}>
            <ModalUserStaff ref={ModalRef} handleMakeStaffChange={handleMakeStaffChange}/>
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
                    Is Active
                    <Checkbox onChange={handleActiveChange} checked={isActive} {...label} defaultChecked color="success"/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Is Staff
                    <Checkbox onChange={handleModalVerification} checked={isStaff} {...label} defaultChecked color="success"/>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardUserStaff