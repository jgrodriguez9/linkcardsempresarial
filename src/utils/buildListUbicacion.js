import React from 'react';
import { countTarjetasDiferentes } from './countTarjetasDiferentes';
import { orderArray } from './orderArray';

export const buildListUbicacion = (arr) =>{
    //console.log(arr)
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        //console.log(item)
        arrayAux.push({
            empresa: item,
            visualizaciones:  arr[item].length,
            cantidad: countTarjetasDiferentes(arr[item])
        })
        //console.log(arr[item])
    })
    return  orderArray(arrayAux, "visualizaciones")
}