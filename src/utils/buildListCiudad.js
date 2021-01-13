import React from 'react';
import { countTarjetasDiferentes } from './countTarjetasDiferentes';
import { orderArray } from './orderArray';

export const buildListCiudad = (arr) =>{
    //console.log(arr)
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        //console.log(item)
        arrayAux.push({
            ciudad: item,
            cantidad: countTarjetasDiferentes(arr[item])
        })
        //console.log(arr[item])
    })
    return  orderArray(arrayAux, "cantidad")
}