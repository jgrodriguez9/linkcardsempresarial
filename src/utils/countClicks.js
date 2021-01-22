import { React } from "react";

export const countClicks = (arr) =>{
    let cont = 0;
    arr.forEach(item=>{
        cont += item.click
    })
    return cont;
}