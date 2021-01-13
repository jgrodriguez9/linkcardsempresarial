import React from 'react'

export const orderArray = (arr, parametro) =>{
    return arr.sort((a,b) => {
        if (a[parametro] < b[parametro]) {
            return 1;
          }
          if (a[parametro] > b[parametro]) {
            return -1;
          }
          // a must be equal to b
          return 0;
    })
}