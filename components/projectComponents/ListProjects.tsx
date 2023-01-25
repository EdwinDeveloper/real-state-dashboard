import React, { FC, useRef} from 'react'
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
import { ExtraComponent } from '../Models/ExtraComponent'


const ListProjects:FC = (props: any) => {

  const { handleShow } = props

  const [showDetails, setShowDetails] = React.useState(false)
  const [detailsToShow, setDetailsToShow] = React.useState<any[]>([])
  const [updDetail, setUpdDetail] = React.useState(null)

  const [showExtras, setShowExtras] = React.useState(false)
  const [extraToShow, setExtraToShow] = React.useState<any[]>([])
  const [updExtra, setUpdExtra] = React.useState(null)

  const [imagesToShow, setImagesToShow] = React.useState<any[]>([])
  const [newImage, setNewImage] = React.useState('')

  const [modalMessage, setModalMessage] = React.useState('')

  const commissions = [
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4361",
      "description": "Main commission",
      "percentage": 0.40
    },
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4362",
      "description": "Ivarika",
      "percentage": 0.45
    },
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4363",
      "description": "Aldea Hortus",
      "percentage": 0.50
    }
  ] 

  const companies = [
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4365",
      "description": "Gova"
    },
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4366",
      "description": "Aldea Hortus"
    },
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4367",
      "description": "BBVA"
    },
    {
      "id": "df9c1ca7-b812-4a07-acd8-b402e7de4368",
      "description": "Monterrey"
    }
  ]

  const inputRef = useRef(null)
  const ModalRef = useRef(null)

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

  const checkForm = () => {
    if(inputRef.current != null){
      const { inputForm } = inputRef.current
      
      const form = inputForm()
      if(ModalRef.current!==undefined && ModalRef.current!==null){
        const { openModal } = ModalRef.current

        if(form['name']===''){
          setModalMessage("Lo sentimos, debes rellenar los campos")
          openModal()
        }
        // }else if(form['model']===''){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['description']===''){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['pre_sale_price']===0){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['rent_price_approximate']===0){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['resale_price_approximate']===0){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['commission']===''){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(form['company_related']===''){
        //   setModalMessage("Lo sentimos, debes rellenar los campos")
        //   openModal()
        // }
        // else if(imagesToShow.length===0){
        //   setModalMessage("El proyecto debe tener al menos una imagen")
        //   openModal()
        // }
        // else if(detailsToShow.length===0){
        //   setModalMessage("El proyecto debe tener al menos un detalle")
        //   openModal()
        // }
        // else if(extraToShow.length===0){
        //   setModalMessage("El proyecto debe tener al menos un extra")
        //   openModal()
        // }
        // else if(typeof form['pre_sale_date']==='object'){
        //   setModalMessage("Lo sentimos, debes seleccionar la fecha de preventa")
        //   openModal()
        // }
        else if(typeof form['premises_delivery_date']==='object'){
          console.log(form['premises_delivery_date'])
          setModalMessage("Lo sentimos, debes seleccionar la fecha de entrega")
          openModal()
        }
        else{
          form['pre_sale_date'] = form['pre_sale_date'].toISOString()
          form['premises_delivery_date'] = form['premises_delivery_date'].toISOString()
          form['images'] = imagesToShow
          form['details'] = detailsToShow
          form['extras'] = extraToShow
          console.log("f : ", form)
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
              onClick={()=>{handleShow("list")}}>
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
            <Inputs ref={inputRef} checkForm={checkForm} companies={companies} commissions={commissions}/>
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
                        if(newImage!=="") setImagesToShow((images)=> [...images, { title: "extra", url: newImage }])
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