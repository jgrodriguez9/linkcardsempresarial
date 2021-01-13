import React from 'react';

export const classPercent = (numero) =>{
    if (numero >= 65){
        return 'st-cl-80'
    }else if(numero > 40 && numero < 65){
        return 'st-cl-60';
    }else if(numero > 25 && numero <=40){
        return 'st-cl-40';
    }else if(numero > 18 && numero <=25){
        return 'st-cl-30';
    }else if(numero > 10 && numero <=18){
        return 'st-cl-20';
    }else{
        return 'st-cl-10';
    }
}