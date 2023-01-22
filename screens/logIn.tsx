import React, { FC } from 'react'
import Image from 'next/image'
import logo from '../assets/loadingLogo.png'

const LogIn:FC = () => {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            backgroundColor: "#20C0AD",
            justifyContent: "center",
            alignItems: "center",
            }}>
                <div style={{
                    width: "36%",
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    boxShadow: "3px 3px 1px #888888"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            display: "flex",
                            // witdh: "100%",
                            height: 140,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}>
                            {/* <Image src={logo} width='80' height='80'/> */}
                        </div>
                        <text style={{
                            color: "#000000",
                            textAlign: "center",
                            marginBottom: 5,
                            marginTop: 15,
                        }}>CORREO ELECTRONICO</text>
                        <input style={{
                            backgroundColor: "#FFFFFF",
                            marginTop: "5%",
                            height: 40,
                            width: 250,
                            color: "#000000",
                            textAlign: "center",
                            fontSize: "1.2rem",
                            borderRadius: 10,
                        }} type={"text"}/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <text style={{
                            color: "#000000",
                            textAlign: "center",
                            marginBottom: 5,
                            marginTop: 15,
                        }}>CONTRASEÑA</text>
                        <input style={{
                            backgroundColor: "#FFFFFF",
                            marginTop: "5%",
                            height: 40,
                            width: 250,
                            color: "#000000",
                            textAlign: "center",
                            fontSize: "1.2rem",
                            borderRadius: 10,
                        }} type={"password"}/>
                    </div>
                    <div style={{
                        display: "flex",
                        marginTop: 40,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <button className='button' style={{
                            width: 250,
                            height: 45,
                            borderRadius: 10,
                            cursor: "pointer",
                            backgroundColor: "#03342e",
                        }}
                        >Log In</button>
                    </div>
                </div>
            </div>
    )
}

export default LogIn