import React from 'react';
import NumberFormat from 'react-number-format';

export const numberFormat = (number) =>{
    return <NumberFormat value={number} displayType={'text'} thousandSeparator={true} />
}