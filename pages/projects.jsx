import React,{ useState } from 'react'
import Layout from '../components/Layout'
import classNames from 'classnames'

const projects = () => {

  const [rent, setRent] = useState()
  const [presale, setPresale] = useState()

  const handleChangeRent = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setRent(value)
  }
  const handleChangePreSale = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setPresale(value)
  }

  return (
    <Layout>
      <div className='project_container'>
        <div className='default_form'>
          <div className='default_input_container'>
            <text>Nombre</text>
            <input placeholder='nombre del proyecto' className='default_input' type={'text'}/>
          </div>
          <div className='default_input_container'>
            <text>Modelo</text>
            <input placeholder='modelo en el proyecto' className='default_input' type={'text'}/>
          </div>
          <div className='default_text_area_container'>
            <text>Descripción</text>
            <textarea className='default_text_area'/>
          </div>
          <div className='default_input_container'>
            <text>Precio de Preventa</text>
            <input value={presale} onChange={handleChangePreSale} placeholder='0.0' className='default_input' type={'text'}/>
          </div>
          <div className='default_input_container'>
            <text>Fecha de Preventa</text>
            <input className='default_input' type={'date'}/>
          </div>
          <div className='default_input_container'>
            <text>Fecha estimada de entrega</text>
            <input className='default_input' type={'date'}/>
          </div>
          <div className='default_input_container'>
            <text>Renta aproximada</text>
            <input value={rent} onChange={handleChangeRent} placeholder='0.0' className='default_input' type={'text'}/>
          </div>
          <div className='default_input_container'>
            <text>Re venta aproximada</text>
            <input value={rent} onChange={handleChangeRent} placeholder='0.0' className='default_input' type={'text'}/>
          </div>
        </div>
        <div className='more_info'>
          <div className='extra_form'>
            <text>Detalles del proyecto</text>
            <div>
              <button className='default_button'>Nuevo</button>
            </div>
          </div>
          <div className='extra_form'>
            <text>Información extra del proyecto</text>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default projects