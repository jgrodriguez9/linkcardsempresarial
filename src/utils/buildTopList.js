import React from 'react';
import { orderArray } from './orderArray';

export const buildTopList = (arr) =>{
    let arrayAux = [];
    //console.log(arr)
    Object.keys(arr).forEach(item=>{
        arrayAux.push({
            nombre: item,
            empresa: arr[item][0].empresa,
            puesto: arr[item][0].puesto,
            tarjeta: arr[item][0].tarjeta,
            visualizaciones:  arr[item].length,
        })
        //console.log(arr[item])
    })
    return  orderArray(arrayAux, "visualizaciones")
}