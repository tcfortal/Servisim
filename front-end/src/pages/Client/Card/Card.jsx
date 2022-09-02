import React from "react";
import './Card.css'
import { Link } from "react-router-dom";
import imagemPerfil from "./imagemPerfil.png"
import imagemPedidos from "./imagemPedidos.png"

export default function Card() {
    return (
        <div className="container">
            <Link to="./clientUpdate">
                <div className="card-container">

                    <div className="image-container">
                        <img src={imagemPerfil} alt='' />
                    </div >

                    <div className="card-content">
                        <div className="card-title">
                            <h4> MEU PERFIL </h4>
                        </div>
                    </div>
                </div>
            </Link>

            <Link to="./ordensCliente">
                <div className="card-container">

                    <div className="image-container">
                        <img src={imagemPedidos} alt='' />
                    </div >

                    <div className="card-content">
                        <div className="card-title">
                            <h4> MINHAS ORDENS </h4>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

