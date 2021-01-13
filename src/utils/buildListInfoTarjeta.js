import React from 'react';
import { orderArray } from './orderArray';

export const buildListInfoTarjeta = (arr) =>{
    //console.log(arr)
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        arr[item].forEach(elem=>{
            elem['used'] = 1
            arrayAux.push(elem)
        })
        arrayAux  = arr[item]
    })

    var helper = {};
    var result = arrayAux.reduce(function(r, o) {
    var key = o.nombre + '-' + o.tarjeta;
    
    if(!helper[key]) {
        helper[key] = Object.assign({}, o); // create a copy of o
        r.push(helper[key]);
    } else {
        helper[key].used += o.used;
    }

    return r;
    }, []);
    
    return orderArray(result, "used")
}