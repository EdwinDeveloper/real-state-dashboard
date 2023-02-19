import React, { FC, useState, useRef } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import { SelectAppState, setCompaniesList } from '../redux/index'
import { useSelector as UseSelector } from "react-redux"
import CardCompanie from '../components/projectComponents/Cards/CardCompanie'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import { getCompanies, createCompany as CreateCompany, updateCompany as UpdateCompany } from '../redux/fetch/services'
import { apiCall } from '../redux/fetch/management'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { useDispatch } from "react-redux"
import Image from 'next/image'

export interface Companie {
    id: string,
    name: string,
    icon: string,
}

const Companies:FC = ()=>{

    const dispatch = useDispatch()

    const AppState = UseSelector(SelectAppState)
    const { userInfo, companiesList } = AppState

    const [comState, setComState] = useState('list')
    const [action, setAction] = useState("new")

    const [idCompanySelected, setIdCompanySelected] = useState('')
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')

    const [modalMessage, setModalMessage] = useState('')

    const Modal = useRef<any>(null)

    const companies = () => {
        return companiesList.map((companie: Companie)=>{
            return (
                <CardCompanie key={companie.id} companie={companie} updateCompany={updateCompany}/>
            )
        })
    }

    const updateCompaniesList = (message: string) => {
        Modal.current.openModal()
        setModalMessage(message)
        setTimeout(async() => {
            Modal.current.closeModal()
            let companies = await apiCall(getCompanies, null, AppState.authToken, "")
            console.log("companiesss : ", companies)
            dispatch(setCompaniesList(companies))
            setComState("list")
        }, 500);
    }

    const createCompany = () => {
        setName("")
        setIcon("")
        setComState("form")
        setAction("new")
        setIdCompanySelected("")
    }
    const createCompanyAction = async() => {
        if(name === ""){
            setModalMessage("Añade un nombre de compañia")
            Modal.current.openModal()
        }
        if(icon === ""){
            setModalMessage("Añade un icono de compañia")
            Modal.current.openModal()
        }
        if(name !== "" && icon !== ""){
            let request = {
                name: name, icon: icon
           }
           let response = await apiCall(CreateCompany, request, AppState.authToken, "")
           if(response.status === 200){
                updateCompaniesList("Compañia guardada correctamente")
           }
        }
    }

    const updateCompany = (company: Companie) => {
        console.log("selector : ", company)
        setComState("form")
        setAction("update")
        setIdCompanySelected(company.id)
        setName(company.name)
        setIcon(company.icon)
    }

    const updateCompanyAction = async() => {
        console.log("si lo da")
        if(name === ""){
            setModalMessage("Añade un nombre de comisión")
            Modal.current.openModal()
        }
        if(icon === ""){
            setModalMessage("Añade un porcentage de comisión")
            Modal.current.openModal()
        }
        if(name !== "" && icon !== ""){
            let request = {
                name: name, icon: icon
           }
           let response = await apiCall(UpdateCompany, request, AppState.authToken, idCompanySelected)
           if(response.status === 200){
                updateCompaniesList("Compañia actualizada correctamente")
           }
        }
    }

    return (
        <Layout>
            <Box style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
            }}>
                <ModalPer ref={Modal} title={""} message={modalMessage}/>
                { comState === "list" &&
                    <Box style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button
                            style={{
                                backgroundColor: "#159988",
                                marginTop: 50,
                                width: 200,
                                height: 50,
                                marginBottom: 50,
                            }}
                            onClick={()=>createCompany()}
                            variant="contained"
                            color="success"
                        >
                            Nueva Empresa
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
                            {companies()}
                        </Box>
                    </Box>
                    
                }
                {   comState === "form" &&
                    <Box style={{
                        width: "100%",
                        height: "40vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        { action === "new" ? <h1>{"Registrar nueva empresa"}</h1> : <h1>{"Actualizar empresa"}</h1> }
                        <Button
                            style={{
                            backgroundColor: "#159988",
                            marginTop: 50,
                            width: 200,
                            height: 50,
                            marginBottom: 50,
                            }}
                            onClick={()=>setComState("list")}
                            variant="contained"
                            color="success"
                        >
                            Cancelar
                        </Button>
                        <Box style={{
                            width: "60%",
                            height: "100vh",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "stretch",
                            }}>
                                <ValidationTextField
                                label="Nombre de empresa"
                                required
                                variant="outlined"
                                helperText="Nombre de empresa"
                                defaultValue=""
                                placeholder='Nombre de empresa'
                                id="validation-outlined-input"
                                value={name}
                                onChange={(name)=>setName(name.target.value)}
                                />
                                <ValidationTextField
                                label="Url de imagen"
                                required
                                variant="outlined"
                                helperText="Url de imagen"
                                defaultValue=""
                                placeholder='Url de imagen'
                                id="validation-outlined-input"
                                value={icon}
                                onChange={(icon)=>setIcon(icon.target.value)}
                                />
                                {   action === "new" &&
                                    <Button
                                        style={{
                                            backgroundColor: "#159988",
                                            width: 150,
                                            height: 50,
                                        }}
                                        onClick={()=>createCompanyAction()}
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
                                        onClick={()=>updateCompanyAction()}
                                        variant="contained"
                                        color="success"
                                    >
                                        Actualizar
                                    </Button>
                                }
                                {/* <Box>
                                
                            </Box> */}
                            </Box>
                            <Box style={{
                                width: 200,
                                height: 500,
                            }}>
                                <Image
                                    src={`${icon}?w=200&h=100&fit=crop&auto=format`}
                                    alt={"Logo Ejemplo"}
                                    style={{
                                        width: 200,
                                        height: 100,
                                        borderRadius: 8,
                                    }}
                                    loading="lazy"
                                />
                            </Box>
                    </Box>
                }
            </Box>
        </Layout>
    )
}

export default Companies