import React, { FC, useEffect, useRef, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ValidationTextField } from '../../public/ValidationTextField'
import AddDetail from '../projectComponents/AddDetail'
import AddExtra from '../projectComponents/AddExtra'
import Inputs  from '../projectComponents/Inputs'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import DetailsReviewCard from '../Objects/DetailsReviewCard'
import ModalPer from './Modals/ModalPer'
import { DetailComponent } from '../Models/DetailComponent'
import { getProjects, createProject, updateProject } from '../../redux/fetch/services'
import { CreateProjectResponse, UpdateProjectResponse } from '../../redux/fetch/responses'
import { FetchCall } from '../../redux/fetch/FetchCall'
import { Detail, Extra, Image, Project } from '../../redux/fetch/responses'
import { Companie, Bonus } from '../../redux/fetch/responses'
import MUIImage from 'next/image'
import { setIdProjectSelected, setProjects } from '../../redux/slices/projects'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { GetProjectsResponse } from '../../redux/fetch/responses'
import CardAmenities from './Cards/CardAmenities'

interface ListProps {
  handleShow: (screen: string) => void,
}

const ListProjects:FC<ListProps> = (props) => {

  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [preSalePrice, setPreSalePrice] = useState('')
  const [rentPriceApproximate, setRentPriceApproximate] = useState('')
  const [resalePriceApproximate, setResalePriceApproximate] = useState('')
  const [preSaleDate, setPreSaleDate] = useState('')
  const [premisesDeliveryDate, setPremisesDeliveryDate] = useState('')
  const [description, setDescription] = useState('')
  const [idComission, setIdBonus] = useState('')
  const [idCompany, setIdCompany] = useState('')

  const [bathrooms, setBathrooms] = useState(0)
  const [bedrooms, setBetrooms] = useState(0)
  const [kitchen, setKitchen] = useState(0)
  const [garage, setGarage] = useState(0)
  const [gym, setGym] = useState(false)
  const [security, setSecurity] = useState(false)
  const [pool, setPool] = useState(false)
  const [yoga, setYoga] = useState(false)

  const [imagesToShow, setImagesToShow] = useState<Image[]>([])

  const [showDetails, setShowDetails] = useState(false)
  const [detailsToShow, setDetailsToShow] = useState<any[]>([])
  const [updDetail, setUpdDetail] = useState(null)

  const addDetailInfo = (element: any) => {
    const newElement: any = detailsToShow
    newElement.push(element)
    setDetailsToShow(newElement)
    setShowDetails(false)
  }
  const deleteDetailInfo = (id: String) => {
    let detailsUpdate = detailsToShow.filter((detail) => {
      return detail.id !== id
    })
    setDetailsToShow(detailsUpdate)
  }
  const updateDetailInfoFinal = (detail: any) => {
    const newElement: any = detailsToShow
    newElement.forEach((e: any, i: any) => { if(e.id === detail.id) newElement[i] = detail  })
    setDetailsToShow(newElement)
    setUpdDetail(null)
    setShowDetails(false)
  }
  const updateDetailInfo = (id: String) => {
    let detailUpdate = detailsToShow.filter((detail)=> {
      return detail.id === id
    })
    setUpdDetail(detailUpdate[0])
    setShowDetails(true)
  }

  const bonusesList = useAppSelector((state)=>state.bonuses.bonuses)
  const idProjectSelected = useAppSelector((state)=>state.projects.idProjectSelected)
  const companiesList = useAppSelector((state)=>state.companies.companies)
  const authToken = useAppSelector((state)=>state.State.authToken)
  const projects = useAppSelector((state)=>state.projects.projects)
  const [projectList, setProjectsList] = useState<Project[]>( projects !== undefined && projects.length > 0 ? projects: [] )
  const dispatch = useAppDispatch()

  useEffect(()=>{
    let projectIn: Project[] = []
    projectList !== undefined ? projectList.find((project: Project)=>{
      if(idProjectSelected === project.id){
        projectIn.push(project)
      }
    }): []

    if(projectIn.length > 0 ){
      setName(projectIn[0].name)
      setModel(projectIn[0].model)
      setPreSalePrice(projectIn[0].pre_sale_price.toString())
      setRentPriceApproximate(projectIn[0].rent_price_approximate.toString())
      setResalePriceApproximate(projectIn[0].resale_price_approximate.toString())
      setPreSaleDate(projectIn[0].pre_sale_date)
      setPremisesDeliveryDate(projectIn[0].premises_delivery_date)
      setDescription(projectIn[0].description)
      setIdBonus(projectIn[0].bonus)
      setIdCompany(projectIn[0].company_related)

      setBathrooms(projectIn[0].bathrooms)
      setBetrooms(projectIn[0].bedrooms)
      setKitchen(projectIn[0].kitchen)
      setGarage(projectIn[0].garage)
      setGym(projectIn[0].gym)
      setSecurity(projectIn[0].security)
      setPool(projectIn[0].pool)
      setYoga(projectIn[0].yoga)

      projectIn[0].images.forEach((imag)=>setImagesToShow((images)=> [...images, { title: imag.title, url: imag.url, id: imag.id }]))
      projectIn[0].details.forEach((d: Detail)=>addDetailInfo({key: d.key, info: d.info, id: d.id}))
      projectIn[0].extras.forEach((e: Extra)=>addExtraInfo({key: e.key, info: e.info, id: e.id}))
    }else{
      setName('')
      setModel('')
      setPreSalePrice('')
      setRentPriceApproximate('')
      setResalePriceApproximate('')
      setPreSaleDate('')
      setPremisesDeliveryDate('')
      setDescription('')
      setIdBonus('')
      setIdCompany('')

      setBathrooms(0)
      setBetrooms(0)
      setKitchen(0)
      setGarage(0)
      setGym(false)
      setSecurity(false)
      setPool(false)
      setYoga(false)

      setImagesToShow([])
      setDetailsToShow([])
      setExtraToShow([])
    }
  }, [])

  const { handleShow } = props

  const [showExtras, setShowExtras] = useState(false)
  const [extraToShow, setExtraToShow] = useState<any[]>([])
  const [updExtra, setUpdExtra] = useState(null)

  const [newImage, setNewImage] = useState('')

  const [modalMessage, setModalMessage] = useState('')

  const bonuses: Bonus[] = bonusesList

  const companies: Companie[] = companiesList

  const ModalRef = useRef<any>(null)
  const inputRef = useRef<any>(null)

  const cancelForm = async() => {
    const responseProjects = await FetchCall<GetProjectsResponse>(getProjects("", authToken))
    if(responseProjects.status === 200){
      setProjectsList(responseProjects.data)
      dispatch(setProjects(responseProjects.data))
    }
    dispatch(setIdProjectSelected(""))
    handleShow("list")
  }

  const addExtraInfo = (element: any) => {
    const newElement: any = extraToShow
    newElement.push(element)
    setExtraToShow(newElement)
    setShowExtras(false)
  }
  const deleteExtraInfo = (id: String) => {
    let extrasUpdate = extraToShow.filter((extra) => {
      return extra.id !== id
    })
    setExtraToShow(extrasUpdate)
  }
  const updateExtraInfoFinal = (extra: any) => {
    const newElement: any = extraToShow
    newElement.forEach((e: any, i: any) => { if(e.id === extra.id) newElement[i] = extra  })
    setExtraToShow(newElement)
    setUpdExtra(null)
    setShowExtras(false)
  }
  const updateExtraInfo = (id: String) => {
    let extraUpdate = extraToShow.filter((extra)=> {
      return extra.id === id
    })
    setUpdExtra(extraUpdate[0])
    setShowExtras(true)
  }

  const onCheckImage = (event: any, index: any) => {
    let newArray = imagesToShow.filter((image, filterIndex) => {
      return filterIndex !== index
    })
    setImagesToShow(newArray)
  }
  
  const cancel = (flow: string) => {
    switch (flow) {
      case "details":
        setShowDetails(false)
        break
      case "extras":
        setShowExtras(false)
        break
      default:
        break
    }
  }

  const checkForm = async() => {
      
      if(ModalRef.current!==undefined && ModalRef.current!==null){
        const { openModal } = ModalRef.current   

        if(name===''){
          setModalMessage("El proyecto debe tener un nombre")
          openModal()
        }
        else if(model===''){
          setModalMessage("El proyecto debe tener un modelo")
          openModal()
        }
        else if(description===''){
          setModalMessage("El proyecto debe tener una descripción")
          openModal()
        }
        else if(description.length>255){
          setModalMessage("La descripción debe tener maximo 255 caracteres")
          openModal()
        }
        else if(preSalePrice===""){
          setModalMessage("El proyecto debe tener un precio de preventa")
          openModal()
        }
        else if(rentPriceApproximate===""){
          setModalMessage("El proyecto debe tener un precio de renta")
          openModal()
        }
        else if(resalePriceApproximate===""){
          setModalMessage("El proyecto debe tener un precio de reventa")
          openModal()
        }
        else if(idComission===''){
          setModalMessage("El proyecto debe tener una comisión")
          openModal()
        }
        else if(idCompany===''){
          setModalMessage("El proyecto debe tener una compañia asociada")
          openModal()
        }
        else if(imagesToShow.length===0){
          setModalMessage("El proyecto debe tener al menos una imagen")
          openModal()
        }
        else if(detailsToShow.length===0){
          setModalMessage("El proyecto debe tener al menos un detalle")
          openModal()
        }
        else if(extraToShow.length===0){
          setModalMessage("El proyecto debe tener al menos un extra")
          openModal()
        }
        else if( preSaleDate===''){
          setModalMessage("Lo sentimos, debes seleccionar la fecha de preventa")
          openModal()
        }
        else if( premisesDeliveryDate === ''){
          setModalMessage("Lo sentimos, debes seleccionar la fecha de entrega")
          openModal()
        }
        else{
          let request = {
            name, model, description,
            pre_sale_price: preSalePrice,
            pre_sale_date: preSaleDate,
            premises_delivery_date: premisesDeliveryDate,
            rent_price_approximate: rentPriceApproximate,
            resale_price_approximate: resalePriceApproximate,
            images: imagesToShow,
            details: detailsToShow,
            extras: extraToShow,
            bonus: idComission,
            company_related: idCompany,
            bathrooms: bathrooms,
            bedrooms: bedrooms,
            kitchen: kitchen,
            garage: garage,
            gym: gym,
            security: security,
            pool: pool,
            yoga: yoga
          }
          if(idProjectSelected){
            let updateResponse = await FetchCall<UpdateProjectResponse>(updateProject(request, authToken, idProjectSelected + "/"))
            if(updateResponse.status===200){
              cancelForm()
            }
          }else{
            let newResponse = await FetchCall<CreateProjectResponse>(createProject(request, authToken))
            if(newResponse.status===201){
              cancelForm()
            }
          }
        }
      }
  }

  return (
      <Box style={{
        width: "100%",
        height: 800,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
      }}>
        <ModalPer ref={ModalRef} title={"Formulario"} message={modalMessage}/>
         <Box style={{
          width: "70%",
          height: 100,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
         }}>
              <Button style={{
                  backgroundColor: "#159988",
                  width: "40%"
                }}
                variant="contained"
                color="success"
                onClick={checkForm}>
                  Guardar
              </Button>
              <Button style={{
                  backgroundColor: "#dc5e5e",
                  width: "40%"
                }}
                variant="contained"
                color="success"
                onClick={()=>{cancelForm()}}>
                  Cancelar
              </Button>
         </Box>
          <Box sx={styles.formImage}>
            <Inputs
              ref={inputRef}
              name={name}
              setName={setName}
              model={model}
              setModel={setModel}
              preSalePrice={preSalePrice}
              setPreSalePrice={setPreSalePrice}
              rentPriceApproximate={rentPriceApproximate}
              setRentPriceApproximate={setRentPriceApproximate}
              resalePriceApproximate={resalePriceApproximate}
              setResalePriceApproximate={setResalePriceApproximate}
              preSaleDate={preSaleDate}
              setPreSaleDate={setPreSaleDate}
              premisesDeliveryDate={premisesDeliveryDate}
              setPremisesDeliveryDate={setPremisesDeliveryDate}
              description={description}
              setDescription={setDescription}
              idBonus={idComission}
              setIdBonus={setIdBonus}
              idCompany={idCompany}
              setIdCompany={setIdCompany}
              companies={companies}
              bonuses={bonuses}
            />
            <Box style={{
                    marginTop: 10,
              }} >
                <div style={{
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}>
                  <div>
                    <Button
                      style={{backgroundColor: "#159988"}}
                      variant="contained" 
                      color="success"
                      onClick={() => {
                        if(newImage!=="") setImagesToShow((images)=> [...images, { title: "extra", url: newImage, id:"" }])
                      }}
                    >Nueva Imagen</Button>
                  </div>
                  <div>
                  <Box
                      component="form"
                      noValidate
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr' },
                        gap: 1,
                      }}
                    >
                  <ValidationTextField
                          label="Url de la imagen"
                          required
                          variant="outlined"
                          helperText="Introduce la url de la imagen"
                          defaultValue=""
                          placeholder='url de la imagen'
                          id="validation-outlined-input"
                          onChange={(newValue: any)=>{setNewImage(newValue.target.value)}}
                        />
                        </Box>
                  </div>
                </div>
              <div>
                  <ImageList sx={{ width: 500, height: 400 }} cols={3} rowHeight={164}>
                  {
                    imagesToShow.map((item: any, index: number) => (
                      
                        <ImageListItem key={index}>
                          <MUIImage
                            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                            width={200}
                            height={200}
                            alt={item.title}
                            loading="lazy"
                            onClick={(event: any)=>onCheckImage(event, index)}
                          />
                        </ImageListItem>
                      )
                    )
                  }
                </ImageList>
              </div>
            </Box>
      </Box>
      <Box style={{
        marginTop: 100,
        width: '70%',
        height: 50,
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
      }}>
          <CardAmenities title={'Habitaciones'} total={bedrooms} icon={2} check={false} available={false} changeInt={setBetrooms}/>
          <CardAmenities title={'Baños'} total={bathrooms} icon={1} check={false} available={false} changeInt={setBathrooms}/>
          <CardAmenities title={'Garaje'} total={garage} icon={3} check={false} available={false} changeInt={setGarage}/>
          <CardAmenities title={'Cocina'} total={kitchen} icon={4} check={false} available={false} changeInt={setKitchen}/>
          <CardAmenities title={'Gym'} total={0} icon={5} check={true} available={gym} changeBol={setGym}/>
          <CardAmenities title={'Seguridad'} total={0} icon={6} check={true} available={security} changeBol={setSecurity}/>
          <CardAmenities title={'Alberca'} total={0} icon={7} check={true} available={pool} changeBol={setPool}/>
          <CardAmenities title={'Yoga'} total={0} icon={8} check={true} available={yoga} changeBol={setYoga}/>
      </Box>
       <Box sx={styles.buttonDetails}>
        <Box style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 250,
          flexDirection: "column",
          marginBottom: 30,
        }}>
          <Box style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: 20,
            marginTop: 40
          }}>
            <Box style={{
              fontSize: "1.4rem"
            }}>
              Detalles del Proyecto
            </Box>
            <Box>
              <Button style={{backgroundColor: "#159988"}} onClick={()=>{setShowDetails(true)}} variant="contained" color="success">Nuevo detalle</Button>
            </Box>
          </Box>
          { showDetails &&
            <Box style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddDetail upd={updDetail} update={updateDetailInfoFinal} add={addDetailInfo} cancel={cancel}/>
            </Box>
          }
          { !showDetails &&
            <Box style={{
              overflow: "scroll",
              width: "100%",
            }}>
              { detailsToShow.map((det: DetailComponent)=>{
                det.deleteDetailInfo=deleteDetailInfo
                det.updateDetailInfo=updateDetailInfo
                return  <DetailsReviewCard
                    key={Math.random().toString()}
                    detail={det}
                  />
              })
              }
            </Box>
          }
        </Box>
        <Box style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 250,
          flexDirection: "column",
          marginBottom: 30,
        }}>
          <Box style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}>
            <Box style={{
                fontSize: "1.4rem"
              }}>
                Información Extra
            </Box>
            <Box>
              <Button style={{backgroundColor: "#159988"}} onClick={()=>{setShowExtras(true)}} variant="contained" color="success">Nuevo extra</Button>
            </Box>
          </Box>
          { showExtras && 
            <Box style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddExtra upd={updExtra} update={updateExtraInfoFinal} add={addExtraInfo} cancel={cancel}/>
            </Box>
          }
          { !showExtras &&
            <Box style={{
              overflow: "scroll",
              width: "100%",
            }}>
              { extraToShow.map((ex: DetailComponent)=>{
                ex.deleteDetailInfo=deleteExtraInfo
                ex.updateDetailInfo=updateExtraInfo
                return <DetailsReviewCard key={Math.random().toString()}
                  detail={ex}
                />
                })
              }
            </Box>
          }
        </Box>
      </Box>
      </Box>
  )
}

const styles = {
  formImage: {
    width: "95%",
    height: 600,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    '@media (max-width: 1200px)': {
      flexDirection: 'column',
      height: 1200,
    },
  },
  amenities: {
    marginTop: 100,
    width: '70%',
    height: '30vh',
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  buttonDetails: {
    width: "95%",
    height: 600,
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    '@media (max-width: 1200px)': {
      flexDirection: 'column',
    },
  }
}

export default ListProjects