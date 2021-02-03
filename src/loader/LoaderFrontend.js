import React from "react";
import loader from '../images/loader.svg';
import './LoaderFrontend.css'

const commonStyle = {
    margin: 'auto',
    position: 'initial',
    left: 0,
    right: 0,
    top:10,
    bottom:10
};

export const LoaderFrontend = () => {
    return  (
        <div className="react-loader-overlay-2">
            <div className="react-confirm-alert">
                <div className="custom-ui-2">
                        <h2>Espere mientras procesamos su solicitud</h2>
                        <img  src={loader} alt="Loading"style={commonStyle}/>
                </div>
            </div>
        </div>
    )
}