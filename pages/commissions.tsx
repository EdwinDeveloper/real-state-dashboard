import React, { FC, useState } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import CardCommissions from '../components/projectComponents/Cards/CardCommission'
import { SelectAppState } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'

export interface Commission {
    id: string,
    percentage: string,
    description: string,
}

const Commissions:FC = ()=>{

    const AppState = UseSelector(SelectAppState)
    const { userInfo } = AppState
    const [comState, setComState] = useState("main")

    const [newPercentage, setNewPercentage] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')

    const screen = (screen: string) => {
        setComState(screen)
    }

    const commissions = () => {
        return userInfo.commissions.map((commission: Commission)=>{
            return (
                <CardCommissions commission={commission} activateForm={screen}/>
            )
        })
    }

    const createCommission = () => {
        let commission = {
            percentage: newPercentage,
            description: newDescription
        }
        if(newPercentage ===0.0 && newDescription === ''){
            alert("we no mames")
        }else {
            console.log("request : ", commission)
        }
    }

    return (
        <Layout>
            <Box style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
            }}>
                { comState === "main" &&
                    <Box style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button
                            style={{
                            backgroundColor: "#159988",
                            width: 300,
                            marginBottom: 50,
                            }}
                            onClick={()=>setComState("form")}
                            variant="contained"
                            color="success"
                        >
                            Nueva comisión
                        </Button>
                        <Box style={{
                            width: "94%",
                            height: "90vh",
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "stretch",
                        }}>
                            {commissions()}
                        </Box>
                    </Box>
                }
                {
                    comState === "form" &&
                    <Box style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button
                            style={{
                            backgroundColor: "#159988",
                            width: 300,
                            marginBottom: 50,
                            }}
                            onClick={()=>setComState("main")}
                            variant="contained"
                            color="success"
                        >
                            Cancelar
                        </Button>
                        <Box style={{
                        width: "60%",
                        height: "90vh",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "stretch",
                            }}>
                                <ValidationTextField
                                label="Porcentaje comisión"
                                required
                                type="number"
                                variant="outlined"
                                helperText="Porcentaje comisión"
                                defaultValue=""
                                placeholder='Porcentaje comisión'
                                id="validation-outlined-input"
                                value={newPercentage}
                                onChange={(percentage)=>setNewPercentage(parseFloat(percentage.target.value))}
                                />
                                <ValidationTextField
                                label="Nombre de comisión"
                                required
                                variant="outlined"
                                helperText="Nombre de comisión"
                                defaultValue=""
                                placeholder='Nombre de comisión'
                                id="validation-outlined-input"
                                value={newDescription}
                                onChange={(description)=>setNewDescription(description.target.value)}
                                />
                                <Button
                                        style={{
                                            backgroundColor: "#159988",
                                            width: 150,
                                            height: 50,
                                        }}
                                        onClick={()=>createCommission()}
                                        variant="contained"
                                        color="success"
                                    >
                                        Crear
                                </Button>
                            </Box>
                    </Box>
                }
            </Box>
        </Layout>
    )
}

export default Commissions