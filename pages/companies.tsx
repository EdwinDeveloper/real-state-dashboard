import React, { FC } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import CardCompanie from '../components/projectComponents/Cards/CardCompanie'

export interface Companie {
    id: string,
    name: string,
    icon: string,
}

const Companies:FC = ()=>{

    const AppState = UseSelector(SelectAppState)
    const { userInfo } = AppState

    const companies = () => {
        return userInfo.companies.map((companie: Companie)=>{
            return (
                <CardCompanie companie={companie}/>
            )
        })
    }

    return (
        <Layout>
            <Box style={{
                width: "94%",
                height: "90vh",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "stretch",
            }}>
                {companies()}
            </Box>
        </Layout>
    )
}

export default Companies