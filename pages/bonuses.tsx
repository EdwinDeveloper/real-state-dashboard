import React, { FC, useState, useRef } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import CardBonuses from '../components/projectComponents/Cards/CardBonus'
import { setBonuses } from '../redux/slices/bonuses'
import { useAppSelector } from '../redux/hooks'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { createBonus as CreateBonus, updateBonus as UpdateBonus, getBonuses } from '../redux/fetch/services'
import { GetBonusesResponse, UpdateBonusResponse, CreateBonusResponse } from '../redux/fetch/responses'
import { useAppDispatch } from '../redux/hooks'
import { FetchCall } from '../redux/fetch/FetchCall'

export interface Bonus {
    id: string,
    percentage: string,
    description: string,
}

const Bonuses:FC = (props)=>{

    const dispatch = useAppDispatch()

    const bonusess = useAppSelector((state)=> state.bonuses.bonuses)

    const [bonusesList, setBonusesList] = useState<Bonus[]>(bonusess.length > 0 ? bonusess : [])
    const authToken = useAppSelector((state)=> state.State.authToken)
    const [comState, setComState] = useState("main")
    const [action, setAction] = useState("new")

    const [idBonusSelected, setIdBonusSelected] = useState('')
    const [newPercentage, setNewPercentage] = useState(0.0)
    const [newDescription, setNewDescription] = useState('')

    const [modalMessage, setModalMessage] = useState('')

    const Modal = useRef<any>(null)

    const screen = (screen: string) => {
        setComState(screen)
    }

    const bonuses = () => {
        return bonusesList !== undefined && bonusesList !== null ? bonusesList.map((bonus: Bonus)=>{
            return (
                <CardBonuses
                key={bonus.id}
                    bonus={bonus}
                    activateForm={screen}
                    updateBonus={updateBonus}
                />
            )
        }) 
        :
        null
    }

    const createBonus = () => {
        setAction("new")
        setComState("form")
        setIdBonusSelected("")
        setNewDescription("")
        setNewPercentage(0.0)
    }
    const createBonusAction = async() => {
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
            let response = await FetchCall<CreateBonusResponse>(CreateBonus(request, authToken))
            if(response.status ===201){
                updateBonusesList("Comisión creada")
            }
        }
    }

    const updateBonusesList = (message: string) => {
        Modal.current.openModal()
        setModalMessage(message)
        setTimeout(async() => {
            setComState("main")
            Modal.current.closeModal()
            let responseBonuses = await FetchCall<GetBonusesResponse>(getBonuses(null, authToken))
            if(responseBonuses.status == 200){
                setBonusesList(responseBonuses.data)
                dispatch(setBonuses(responseBonuses.data))
            }
        }, 500);
    }

    const updateBonus = (bonus: Bonus) => {
        setAction("update")
        setComState("form")
        setIdBonusSelected(bonus.id)
        setNewDescription(bonus.description)
        setNewPercentage(parseFloat(bonus.percentage))
    }
    const updateBonusAction = async() => {
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
            let response = await FetchCall<UpdateBonusResponse>(UpdateBonus(request, authToken, idBonusSelected))
            if(response.status === 200){
                updateBonusesList("Comisión actualidada")
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
                            onClick={()=>createBonus()}
                            variant="contained"
                            color="success"
                        >
                            Nueva comisión
                        </Button>
                        <Box style={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                                <Box sx={{
                                    fontSize: '1.6em',
                                    paddingBottom: 5,
                                }}>Lista de bonos</Box>
                                <Box sx={{
                                    width: "94%",
                                    height: "90vh",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "stretch",
                                }}>
                                    {bonuses()}
                                </Box>
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
                                onChange={(percentage: any)=>setNewPercentage(parseFloat(percentage.target.value))}
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
                                onChange={(description: any)=>setNewDescription(description.target.value)}
                                />
                                {   action === "new" &&
                                    <Button
                                        style={{
                                            backgroundColor: "#159988",
                                            width: 150,
                                            height: 50,
                                        }}
                                        onClick={()=>createBonusAction()}
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
                                        onClick={()=>updateBonusAction()}
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

export default Bonuses