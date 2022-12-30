import React, {useState, useEffect} from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Box from '@mui/material/Box'
import Layout from "../components/Layout"
import Button from '@mui/material/Button'
import { ValidationTextField } from '../public/ValidationTextField'
import AddExtra  from '../components/projectComponents/AddElement'
import { DetailElement } from '../components/projectComponents/DetailElement'
import Inputs  from '../components/projectComponents/Inputs'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Extra } from '../components/Objects/Extra'
import { v4 } from "uuid";
import DetailsReviewCard from '../components/Objects/DetailsReviewCard'

const detailsList: any = []
const imageList: any = [
  {
    img: 'https://www.govacasa.mx/images/uploads/gallery/xgppw2oil988vmvju2sz2kc2a9xdsudv.jpg',
    title: 'Breakfast',
  }
  //,
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/gallery/bma4b5rfndp9c1yaoc5m54hpuxc90s1o.jpg',
  //   title: 'Burger',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/areas/oVOBdvKlsyUrcouf.jpg',
  //   title: 'Camera',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/models/hLvjRxknPHX03kSW.jpg',
  //   title: 'Coffee',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/gallery/xjgazamok3ezwucol147iaa7eyu3u6qq.jpg',
  //   title: 'Hats',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/gallery/pq4gqordr0efe0wq2waz5uy3yt3obrgu.jpg',
  //   title: 'Honey',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/gallery/opxdfkhidy5dkveiqil4h8hk1scwma2t.jpg',
  //   title: 'Basketball',
  // },
  // {
  //   img: 'https://www.govacasa.mx/images/uploads/gallery/hhzbhffu7by1h5e6zd1garoaqxnbx8yc.jpg',
  //   title: 'Bike',
  // },
]

const projects = () => {

  const [preSaleDate, setPreSaleDate] = React.useState<Dayjs | null>(dayjs(''))
  const [deliveryDate, setDeliveryDate] = React.useState<Dayjs | null>(dayjs(''))

  const [details, setDetails] = React.useState([])
  const [extras, setExtras] = React.useState([])
  const [showDetails, setShowDetails] = React.useState(false) 
  const [showExtras, setShowExtras] = React.useState(false)
  // const [extraToShow, setExtraToShow] = React.useState<Extra[]>([])
  const [extraToShow, setExtraToShow] = React.useState([])
  const [imagesToShow, setImagesToShow] = React.useState([])
  const [newImage, setNewImage] = React.useState('')

  useEffect(()=>{
    const final: any = []
    detailsList.forEach((element: any, index)=>{
      final.push(
        <DetailsReviewCard del={delExtraInfo} element={element} id={index}/>
      )
    })
    setExtraToShow(final)
    const allImages: any = []
    imageList.forEach((image: any)=>{
      allImages.push(image)
    })
    setImagesToShow(allImages)
  }, [])

  const handleChange = (event: any) => {
    console.log(event.target.value)
  }
  

  const addExtraInfo = (element: any) => {
    const final: any = extraToShow
    final.push(
      <DetailsReviewCard del={delExtraInfo} element={element} id={final.length}/>
    )
    setExtraToShow(final)
    setShowDetails(false)
  }
  const delExtraInfo = (id: any) => {
    let items: any = extraToShow
    let newArray = items.filter((item, filterIndex) => {
      console.log(filterIndex, " : ", id)
      return filterIndex !== id
    })
    console.log("id : ", id, " : " ,newArray)
    setExtraToShow(newArray)
  }
  
  const cancel = (flow: string) => {
    switch (flow) {
      case "details":
        setShowDetails(false)
        break
      case "extra":
        setShowExtras(false)
        break
      default:
        break
    }
  }

  const onCheckImage = (event, index) => {
    let images: any = imagesToShow
    let newArray = images.filter((image, filterIndex) => {
      return filterIndex !== index
    })
    setImagesToShow(newArray)
  }
  const onCheckDetail = (event, index) => {
    
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
              <AddExtra add={addExtraInfo} cancel={cancel}/>
            </div>
          }
          { !showDetails &&
            <div style={{
              overflow: "scroll",
              width: "100%",
            }}>
              {extraToShow}
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
              <AddExtra/>
            </div>
          }
          { !showExtras &&
            <div style={{
              overflow: "scroll",
              width: "100%",
            }}>
              {""}
            </div>
          }
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default projects