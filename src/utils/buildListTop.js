import React from 'react';
import { orderArray } from './orderArray';

export const buildListTop = (arr) =>{
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        //console.log(item)
        arrayAux.push({
            nombre: item,
            visualizaciones:  arr[item].length,
            puesto: arr[item][0].puesto,
            tarjeta: arr[item][0].tarjeta,
        })
        //console.log(arr[item])
    })
    return  orderArray(arrayAux, "visualizaciones")
}