import React, {useState, useEffect} from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Box from '@mui/material/Box'
import Layout from "../components/Layout"
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import AddDetail from '../components/projectComponents/AddDetail'
import AddExtra from '../components/projectComponents/AddExtra'
import { DetailElement } from '../components/projectComponents/DetailElement'
import Inputs  from '../components/projectComponents/Inputs'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Extra } from '../components/Objects/Extra'
import uuid from 'react-uuid';
import DetailsReviewCard from '../components/Objects/DetailsReviewCard'

const projects = () => {

  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [deliveryDate, setDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))

  const [showDetails, setShowDetails] = React.useState(false)
  const [detailsToShow, setDetailsToShow] = React.useState([])
  const [updDetail, setUpdDetail] = React.useState(null)

  const [showExtras, setShowExtras] = React.useState(false)
  const [extraToShow, setExtraToShow] = React.useState([])
  const [updExtra, setUpdExtra] = React.useState(null)

  const [imagesToShow, setImagesToShow] = React.useState([])
  const [newImage, setNewImage] = React.useState('')

  useEffect(()=>{

  }, [])

  const addDetailInfo = (element: any) => {
    const newElement: any = detailsToShow
    newElement.push(element)
    setDetailsToShow(newElement)
    setShowDetails(false)
  }
  const delDetailInfo = (id) => {
    let detailsUpdate = detailsToShow.filter((detail) => {
      return detail.id !== id
    })
    setDetailsToShow(detailsUpdate)
  }
  const updateDetailInfoFinal = (detail) => {
    const newElement: any = detailsToShow
    newElement.forEach((e, i) => { if(e.id === detail.id) newElement[i] = detail  })
    setDetailsToShow(newElement)
    setUpdDetail(null)
    setShowDetails(false)
  }
  const updateDetailInfo = (id) => {
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
  const delExtraInfo = (id) => {
    let extrasUpdate = extraToShow.filter((extra) => {
      return extra.id !== id
    })
    setExtraToShow(extrasUpdate)
  }
  const updateExtraInfoFinal = (extra) => {
    const newElement: any = extraToShow
    newElement.forEach((e, i) => { if(e.id === extra.id) newElement[i] = extra  })
    setExtraToShow(newElement)
    setUpdExtra(null)
    setShowExtras(false)
  }
  const updateExtraInfo = (id) => {
    let extraUpdate = extraToShow.filter((extra)=> {
      return extra.id === id
    })
    setUpdExtra(extraUpdate[0])
    setShowExtras(true)
  }

  const onCheckImage = (event, index) => {
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

  return (
    <Layout>
      <div style={{
        width: "100%",
        height: 1900,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
      }}>
          <div style={{
            width: "95%",
            height: 700,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Inputs/>
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
                        if(newImage!=="") setImagesToShow((images)=> [...images, { title: "extra", img: newImage }])
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
                    imagesToShow.map((item: any, index: Number) => (
                      
                        <ImageListItem key={index}>
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
              { detailsToShow.map((det)=>(
                  <DetailsReviewCard upd={updateDetailInfo} del={delDetailInfo} element={det}/>
                ))
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
              { extraToShow.map((ex)=>(
                  <DetailsReviewCard upd={updateExtraInfo} del={delExtraInfo} element={ex}/>
                ))
              }
            </div>
          }
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default projects