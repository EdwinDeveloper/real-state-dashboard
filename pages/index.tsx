import Layout from "../components/Layout"
import classNames from "classnames"
import LogIn from '../screens/logIn'
import { useState } from "react"

export default function Home() {
  const bonos = [
    {
      id: "eee",
      description: "Bono Principal",
      amount: 0.0035
    },
    {
      id: "eee",
      description: "Bono Aldea Hortus",
      amount: 0.0035
    },
    {
      id: "eee",
      description: "Bono Navideño",
      amount: 0.0035
    },
    {
      id: "eee",
      description: "Bono Karima",
      amount: 0.0035
    }
  ]
  let model: any[] = []
  bonos.forEach((bono)=>{
    const { description, amount } = bono
    model.push(
      <div className="commission" style={{
        display: "flex",
        width: "80%",
        height: 50,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
      }}>
        <text>{description}</text>
        <text>{amount}</text>
        <div style={{
          display: "flex",
          width: 150,
          height: 40,
          backgroundColor: "#0E9DFF",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          cursor: "pointer",
        }}>
          <button>Modificar</button>
        </div>
      </div>
    )
  })
  const [ bonCase, setBonCase ] = useState('bonos')
  const changeComCase = function(theCase: string){
    setBonCase(theCase)
  }
  return (
    // <LogIn/>
    <Layout>
      <div className={classNames('w-100 min-h-screen text-center my-4 rounded-3xl')}>
        <div>
          Bonos
        </div>
        <div className={classNames('w-100')}>
          <div className={classNames('w-100')}>
            <button onClick={()=>changeComCase("newBono")} style={{
              width: 200,
              height: 40,
              backgroundColor: "orange",
              borderRadius: 10,
              marginTop: 20,
            }}>Crear Comisión</button>
          </div>
        </div>
        { bonCase == 'bonos' &&
          <div style={{
            marginTop: 100,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {model}
          </div>
        }
        {
          bonCase == 'newBono' &&
          <div>Nuevo Bono</div>
        } 
      </div>
    </Layout>
  )
}