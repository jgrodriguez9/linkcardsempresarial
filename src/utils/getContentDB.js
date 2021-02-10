import React from 'react';

export const getContentDB = (items, type) =>{

    const index = items.findIndex(elem=>elem.icon===type);
    if(index >= 0){
        return items[index].description;
    }else{
        return "";
    }

}