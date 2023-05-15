import React, { useState, FC } from 'react'
import Layout from "../components/Layout"
import CardStaff from '../components/projectComponents/Cards/CardStaff'
import CardUserStaff from '../components/projectComponents/Cards/CardUserStaff'
import { useAppSelector } from '../redux/hooks'
import { User } from '../redux/fetch/responses'
import Box from '@material-ui/core/Box'
import Button from '@mui/material/Button'

const STAFF = "staff"
const USERS = "users"

const Staff:FC = (props) => {

    const [screen, setScreen] = useState(USERS)

    const { staff, users } = useAppSelector((state)=>state.users)
    const { userInfo } = useAppSelector((state)=>state.meInfo)

    const sortedStaff = staff.slice().sort((a, b)=> a.name.localeCompare(b.name) )
    let staffCards: any = []
    sortedStaff.forEach((member: User)=>{
        if(member.id !== userInfo.id) staffCards.push(<CardStaff member={member} staff={staff}/>)
    })
    const sortedUsers = users.slice().sort((a, b)=> a.name.localeCompare(b.name) )
    let usersCards: any = []
    sortedUsers.forEach((member: User)=>{
        if(member.id !== userInfo.id) usersCards.push(<CardUserStaff member={member} staff={staff} users={users}/>)
    })

    console.log("********************************************");
    console.log("sortedStaff : ", sortedStaff);
    console.log("screen : ", screen)
    console.log("usersCards : ", usersCards);
    
    
    return (
        <Layout>
            {   screen === STAFF &&
                <Box>
                    <Button
                        style={{
                            backgroundColor: "#159988",
                            width: 150,
                            height: 50,
                            marginBottom: 20
                        }}
                        onClick={()=>setScreen(USERS)}
                        variant="contained"
                        color="success"
                    >
                        Ver usuarios
                    </Button>
                    <Box>
                        {staffCards}
                    </Box>
                </Box>
            }
            {   screen === USERS &&
                 <Box>
                    <Button
                        style={{
                            backgroundColor: "#159988",
                            width: 150,
                            height: 50,
                            marginBottom: 20
                        }}
                        onClick={()=>setScreen(STAFF)}
                        variant="contained"
                        color="success"
                    >
                        Ver Staff
                    </Button>
                    <Box>
                        {usersCards}
                    </Box>
                </Box>
            }
        </Layout>
    )
}

export default Staff