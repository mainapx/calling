import React from 'react';
import { Button } from '@material-ui/core';
import { navigate } from 'gatsby';
const BackButton = () =>{
    return(
        <Button
            size="large"
            variant="outlined"
            onClick={()=>navigate("/")}
        >Go to home</Button>

    )
}
export default BackButton