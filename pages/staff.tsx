import React, { useState, FC } from 'react'
import Layout from "../components/Layout"
import CardStaff from '../components/projectComponents/Cards/CardStaff'
import { useAppSelector } from '../redux/hooks'
import { User } from '../redux/fetch/responses'

const Staff:FC = (props) => {

    const { staff } = useAppSelector((state)=>state.users)
    const { userInfo } = useAppSelector((state)=>state.meInfo)

    let cards: any = []
    staff.forEach((member: User)=>{
        if(member.id !== userInfo.id) cards.push(<CardStaff member={member} staff={staff}/>)
    })

    return (
        <Layout>
            {cards}
        </Layout>
    )
}

export default Staff