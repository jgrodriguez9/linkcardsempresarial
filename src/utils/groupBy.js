import React from 'react';

export const  groupBy = (data, key)=> {
    //console.log('entro')
    return data.reduce((acc, x) => {
      acc[x[key]] = [...(acc[x[key]] || []), x];
      return acc;
    }, {});
}