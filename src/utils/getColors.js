import React from 'react'

export const getColors = arr =>{
    let aux = [];
    arr.forEach((item,index)=>{
        if(index===0){
            aux.push('#00878E')
        }else if(index > 0 && index <=2){
            aux.push('#1DBDC6')
        }else{
            aux.push('#9ED8D5')
        }
    })
    return aux
}