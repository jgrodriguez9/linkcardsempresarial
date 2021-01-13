import React from 'react';

export const countTarjetasDiferentes = (arr)=>{
    let arrAux = arr.map(item=>item.tarjeta)
    return new Set(arrAux).size
}