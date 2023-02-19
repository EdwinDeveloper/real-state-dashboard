import React, { FC, useState, useRef } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import CardCommissions from '../components/projectComponents/Cards/CardCommission'
import { SelectAppState, setCommissionsList } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { createCommission as CreateCommission, updateCommission as UpdateCommission, getCommissions } from '../redux/fetch/services'
import { apiCall } from '../redux/fetch/management'
import { useDispatch } from "react-redux"

export interface Commission {
    id: string,
    percentage: string,
    description: string,
}

const Commissions:FC = ()=>{

    const dispatch = useDispatch()

    const AppState = UseSelector(SelectAppState)
    const { userInfo, commissionsList } = AppState
    const [comState, setComState] = useState("main")
    const [action, setAction] = useState("new")

    const [idCommissionSelected, setIdCommissionSelected] = useState('')
    const [newPercentage, setNewPercentage] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')

    const [modalMessage, setModalMessage] = useState('')

    const Modal = useRef<any>(null)

    const screen = (screen: string) => {
        setComState(screen)
    }

    const commissions = () => {
        return commissionsList.map((commission: Commission)=>{
            return (
                <CardCommissions
                key={commission.id}
                    commission={commission}
                    activateForm={screen}
                    updateCommission={updateCommission}
                />
            )
        })
    }

    const createCommission = () => {
        setAction("new")
        setComState("form")
        setIdCommissionSelected("")
        setNewDescription("")
        setNewPercentage(0.0)
    }
    const createCommissionAction = async() => {
        if(newDescription === ""){
            setModalMessage("Añade un nombre de comisión")
            Modal.current.openModal()
        }
        if(newPercentage === 0.0){
            setModalMessage("Añade un porcentage de comisión")
            Modal.current.openModal()
        }
        if(newDescription !== "" && newPercentage !== 0.0){
            let request = {
                description: newDescription,
                percentage: newPercentage.toString()
            }
            let response = await apiCall(CreateCommission, request, AppState.authToken, "")
            if(response.status ===201){
                updateCommissionsList("Comisión creada")
            }
        }
    }

    const updateCommissionsList = (message: string) => {
        Modal.current.openModal()
        setModalMessage(message)
        setTimeout(async() => {
            setComState("main")
            Modal.current.closeModal()
            let commissions = await apiCall(getCommissions, null, AppState.authToken, "")
            dispatch(setCommissionsList(commissions))
        }, 500);
    }

    const updateCommission = (commission: Commission) => {
        setAction("update")
        setComState("form")
        setIdCommissionSelected(commission.id)
        setNewDescription(commission.description)
        setNewPercentage(parseFloat(commission.percentage))
    }
    const updateCommissionAction = async() => {
        if(newDescription === ""){
            setModalMessage("Añade un nombre de comisión")
            Modal.current.openModal()
        }
        if(newPercentage === 0.0){
            setModalMessage("Añade un porcentage de comisión")
            Modal.current.openModal()
        }
        if(newDescription !== "" && newPercentage !== 0.0){
            let request = {
                description: newDescription,
                percentage: newPercentage.toString()
            }
            let response = await apiCall(UpdateCommission, request, AppState.authToken, idCommissionSelected)
            if(response.status === 200){
                updateCommissionsList("Comisión actualidada")
            }
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

                <ModalPer ref={Modal} title={""} message={modalMessage}/>
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
                            onClick={()=>createCommission()}
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
                                {   action === "new" &&
                                    <Button
                                        style={{
                                            backgroundColor: "#159988",
                                            width: 150,
                                            height: 50,
                                        }}
                                        onClick={()=>createCommissionAction()}
                                        variant="contained"
                                        color="success"
                                    >
                                        Crear
                                    </Button>
                                }
                                {   action === "update" &&
                                    <Button
                                        style={{
                                            backgroundColor: "#159988",
                                            width: 150,
                                            height: 50,
                                        }}
                                        onClick={()=>updateCommissionAction()}
                                        variant="contained"
                                        color="success"
                                    >
                                        Actualizar
                                    </Button>
                                }
                            </Box>
                    </Box>
                }
            </Box>
        </Layout>
    )
}

export default Commissions