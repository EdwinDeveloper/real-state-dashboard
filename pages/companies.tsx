import React, { FC, useState, useRef } from 'react'
import Layout from '../components/Layout'
import Box from '@material-ui/core/Box'
import { useAppSelector } from '../redux/hooks'
import CardCompanie from '../components/projectComponents/Cards/CardCompanie'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import { getCompanies, createCompany as CreateCompany, updateCompany as UpdateCompany } from '../redux/fetch/services'
import { setCompanies } from '../redux/slices/companies'
import ModalPer from '../components/projectComponents/Modals/ModalPer'
import { useDispatch } from "react-redux"
import Image from 'next/image'
import { FetchCall } from '../redux/fetch/FetchCall'
import { Companie } from '../redux/fetch/responses'
import { GetCompaniesResponse, CreateCompaniesResponse, UpdateCompaniesResponse } from '../redux/fetch/responses'

const Companies:FC = (props)=>{

    const host = ""

    const dispatch = useDispatch()

    const companiess = useAppSelector((state)=> state.companies.companies)
    const authToken = useAppSelector((state)=> state.State.authToken)

    const [comState, setComState] = useState('list')
    const [action, setAction] = useState("new")

    const [idCompanySelected, setIdCompanySelected] = useState('')
    const [name, setName] = useState('')
    const [icon, setIcon] = useState(host)

    const [modalMessage, setModalMessage] = useState('')

    const [companiesList, setCompaniesList] = useState<Companie[]>( companiess !== undefined && companiess.length > 0 ? companiess : [] )

    const Modal = useRef<any>(null)

    const companies = () => {
        return companiesList !== undefined && companiesList.length > 0 ? companiesList.map((companie: Companie)=>{
            return (
                <CardCompanie key={companie.id} companie={companie} updateCompany={updateCompany}/>
            )
        })
        : null
    }

    const updateCompaniesList = (message: string) => {
        Modal.current.openModal()
        setModalMessage(message)
        setTimeout(async() => {
            Modal.current.closeModal()
            let response = await FetchCall<GetCompaniesResponse>(getCompanies("", authToken))
            setCompaniesList(response.data)
            dispatch(setCompanies(response.data))
            setComState("list")
        }, 500);
    }

    const createCompany = () => {
        setName("")
        setIcon(host)
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
           let response = await FetchCall<CreateCompaniesResponse>(CreateCompany(request, authToken))
           if(response.status === 201){
                updateCompaniesList("Compañia guardada correctamente")
           }
        }
    }

    const updateCompany = (company: Companie) => {
        setComState("form")
        setAction("update")
        setIdCompanySelected(company.id)
        setName(company.name)
        setIcon(company.icon)
    }

    const updateCompanyAction = async() => {
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
           let response = await FetchCall<UpdateCompaniesResponse>(UpdateCompany(request, authToken, idCompanySelected))
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
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Box style={{
                                fontSize: '1.4em',
                                marginBottom: 10,
                            }}>Compañias registradas</Box>
                            <Box sx={{
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
                        { action === "new" ? <Box sx={{fontSize: '1.4em'}}>{"Registrar nueva empresa"}</Box> : <Box sx={{fontSize: '1.4em'}}>{"Actualizar empresa"}</Box> }
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
                                onChange={(name: any)=>setName(name.target.value)}
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
                                onChange={(icon: any)=>setIcon(icon.target.value)}
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
                            </Box>
                            <Box style={{
                                width: 200,
                                height: 500,
                            }}>
                                <Image
                                    src={`${icon}`}
                                    alt={"Logo Ejemplo"}
                                    width={200}
                                    height={100}
                                    style={{
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