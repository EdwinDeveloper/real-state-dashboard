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
import ModalPer from '../projectComponents/ModalPer'
import { DetailComponent } from '../Models/DetailComponent'
import { SelectAppState } from '../../redux/index'
import { useSelector as UseSelector, useDispatch } from "react-redux"
import { createProject, updateProject } from '../../redux/fetch/services'
import { apiCall } from '../../redux/fetch/management'
import { Detail, Extra, Image, Project } from '../Models/Project'
import { Companie } from '../Models/Companie'
import { Commission } from '../Models/Commission'
import dayjs, { Dayjs } from 'dayjs'
import { setIdProjectSelected } from '../../redux/index'

const ListProjects:FC = (props: any) => {

  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [preSalePrice, setPreSalePrice] = useState('')
  const [rentPriceApproximate, setRentPriceApproximate] = useState('')
  const [resalePriceApproximate, setResalePriceApproximate] = useState('')
  const [preSaleDate, setPreSaleDate] = useState<Dayjs | null>(dayjs(''))
  const [premisesDeliveryDate, setPremisesDeliveryDate] = useState<Dayjs | null>(dayjs(''))
  const [description, setDescription] = useState('')
  const [idComission, setIdCommission] = useState('')
  const [idCompany, setIdCompany] = useState('')

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

  useEffect(()=>{
    const { userInfo, idProjectSelected } = AppState
    let projectIn: Project = userInfo.projects.find((project: Project)=>{
      if(idProjectSelected === project.id){
        return project
      }
    })
    if(projectIn !== null && projectIn !== undefined ){
      setName(projectIn.name)
      setModel(projectIn.model)
      setPreSalePrice(projectIn.pre_sale_price.toString())
      setRentPriceApproximate(projectIn.rent_price_approximate.toString())
      setResalePriceApproximate(projectIn.resale_price_approximate.toString())
      setPreSaleDate(dayjs(projectIn.pre_sale_date))
      setPremisesDeliveryDate(dayjs(projectIn.premises_delivery_date))
      setDescription(projectIn.description)
      setIdCommission(projectIn.commission)
      setIdCompany(projectIn.company_related)
      projectIn.images.forEach((imag)=>setImagesToShow((images)=> [...images, { title: imag.title, url: imag.url, id: imag.id }]))
      projectIn.details.forEach((d: Detail)=>addDetailInfo({key: d.key, info: d.info, id: d.id}))
      projectIn.extras.forEach((e: Extra)=>addExtraInfo({key: e.key, info: e.info, id: e.id}))
    }else{
      setName('')
      setModel('')
      setPreSalePrice('')
      setRentPriceApproximate('')
      setResalePriceApproximate('')
      setPreSaleDate(dayjs(''))
      setPremisesDeliveryDate(dayjs(''))
      setDescription('')
      setIdCommission('')
      setIdCompany('')
      setImagesToShow([])
      setDetailsToShow([])
      setExtraToShow([])
    }
  }, [])

  const { handleShow } = props

  const AppState = UseSelector(SelectAppState)
  const dispatch = useDispatch()
  const { userInfo, authToken, idProjectSelected } = AppState

  const [showExtras, setShowExtras] = useState(false)
  const [extraToShow, setExtraToShow] = useState<any[]>([])
  const [updExtra, setUpdExtra] = useState(null)
  const [newImage, setNewImage] = useState('')

  const [modalMessage, setModalMessage] = useState('')

  const commissions: Commission[] = userInfo.commissions

  const companies: Companie[] = userInfo.companies

  const ModalRef = useRef(null)
  const inputRef = useRef(null)

  const cancelForm = () => {
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
        else if(preSaleDate.$d.toString()==='Invalid Date'){
          setModalMessage("Lo sentimos, debes seleccionar la fecha de preventa")
          openModal()
        }
        else if(premisesDeliveryDate.$d.toString()==='Invalid Date'){
          setModalMessage("Lo sentimos, debes seleccionar la fecha de entrega")
          openModal()
        }
        else{
          let request = {
            name, model, description,
            pre_sale_price: preSalePrice,
            pre_sale_date: preSaleDate.toISOString(),
            premises_delivery_date: premisesDeliveryDate.toISOString(),
            rent_price_approximate: rentPriceApproximate,
            resale_price_approximate: resalePriceApproximate,
            images: imagesToShow,
            details: detailsToShow,
            extras: extraToShow,
            commission: idComission,
            company_related: idCompany
          }
          if(idProjectSelected !== null && idProjectSelected !== undefined){
            let updateResponse = await apiCall(updateProject, request, authToken, idProjectSelected + "/")
            console.log("updateResponse : ", updateResponse)
            if(updateResponse.status===200){
              cancelForm()
            }
          }else{
            let newResponse = await apiCall(createProject, request, authToken)
            if(newResponse.status===201){
              cancelForm()
            }
          }
        }
      }
  }

  return (
      <div style={{
        width: "100%",
        height: 1900,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
      }}>
        <ModalPer ref={ModalRef} title={"Formulario"} message={modalMessage}/>
         <div style={{
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
         </div>
          <div style={{
            width: "95%",
            height: 580,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
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
              checkForm={checkForm}
              idComission={idComission}
              setIdCommission={setIdCommission}
              idCompany={idCompany}
              setIdCompany={setIdCompany}
              companies={companies}
              commissions={commissions}
            />
            <div style={{
                    marginTop: 70,
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
                          onChange={(newValue)=>{setNewImage(newValue.target.value)}}
                        />
                        </Box>
                  </div>
                </div>
              <div>
                  <ImageList sx={{ width: 500, height: 400 }} cols={3} rowHeight={164}>
                  {
                    imagesToShow.map((item: any, index: number) => (
                      
                        <ImageListItem key={index}>
                          <img
                            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            onClick={(event)=>onCheckImage(event, index)}
                          />
                        </ImageListItem>
                      )
                    )
                  }
                </ImageList>
              </div>
            </div>
      </div>
       <div style={{
        width: "95%",
        height: 600,
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
      }}>
     
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 250,
          flexDirection: "column",
          marginBottom: 30,
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: 20,
          }}>
            <div>
              <text style={{
                fontSize: "1.4rem"
              }}>Detalles del Proyecto</text>
            </div>
            <div>
            <Button style={{backgroundColor: "#159988"}} onClick={()=>{setShowDetails(true)}} variant="contained" color="success">Nuevo detalle</Button>
            </div>
          </div>
          { showDetails &&
            <div style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddDetail upd={updDetail} update={updateDetailInfoFinal} add={addDetailInfo} cancel={cancel}/>
            </div>
          }
          { !showDetails &&
            <div style={{
              overflow: "scroll",
              width: "100%",
            }}>
              { detailsToShow.map((det: DetailComponent)=>{
                det.deleteDetailInfo=deleteDetailInfo
                det.updateDetailInfo=updateDetailInfo
                return  <DetailsReviewCard
                    detail={det}
                  />
              })
              }
            </div>
          }
        </div>
        
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 250,
          flexDirection: "column",
          marginBottom: 30,
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}>
            <div>
              <text style={{
                fontSize: "1.4rem"
              }}>Información Extra</text>
            </div>
            <div>
              <Button style={{backgroundColor: "#159988"}} onClick={()=>{setShowExtras(true)}} variant="contained" color="success">Nuevo extra</Button>
            </div>
          </div>
          { showExtras && 
            <div style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
              <AddExtra upd={updExtra} update={updateExtraInfoFinal} add={addExtraInfo} cancel={cancel}/>
            </div>
          }
          { !showExtras &&
            <div style={{
              overflow: "scroll",
              width: "100%",
            }}>
              { extraToShow.map((ex: DetailComponent)=>{
                ex.deleteDetailInfo=deleteExtraInfo
                ex.updateDetailInfo=updateExtraInfo
                return <DetailsReviewCard
                  detail={ex}
                />
                })
              }
            </div>
          }
        </div>
      </div>
      </div>
  )
}

export default ListProjects