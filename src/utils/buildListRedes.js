import React from 'react';
import { countClicks } from './countClicks';
import { orderArray } from './orderArray';

export const buildListRedes = (arr) =>{
    //console.log(arr)
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        //console.log(item)
        arrayAux.push({
            icon: item,
            visualizaciones:  countClicks(arr[item]),
        })
        //console.log(arr[item])
    })
    return  orderArray(arrayAux, "visualizaciones")
}