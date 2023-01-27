import React from 'react';
import { Button } from '@material-ui/core';

const RLButton = ({text,variant,onClick,name,size,color,outline,background,disabledbtn,id,marginTop}) =>{
    return(
        <Button
            size="large"
            name={name}
            style={{width:`${size}%`,outline:outline,color:color,backgroundColor:background,marginTop:marginTop}}
            onClick={onClick}
            id={id}
            disabled={disabledbtn}
            variant={variant}
        >{text}</Button>
    )
}
export default RLButton;