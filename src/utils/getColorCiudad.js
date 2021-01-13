import React from 'react';

export const getColorCiudad = index =>{
    if(index === 0){
        return 'cl-pie-0';
    }else if(index > 0 && index <=2){
        return 'cl-pie-1'
    }else{
        return 'cl-pie-2'
    }
}