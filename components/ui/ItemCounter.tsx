import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


interface Props {
  currentValue: number;
  // maxValue: number;

  updateQuantity: ( newValue: number ) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, updateQuantity }) => {

  const addOrRemove = ( value: number ) => {
    if( value === -1 ){
      if( currentValue === 1 ) return; 

      return updateQuantity( currentValue -1 );
    }

    // if( currentValue >= maxValue ) return;

    updateQuantity( currentValue + 1 )

  }

  return (
    <>
        <IconButton onClick={ () => addOrRemove(-1) }>
            <RemoveIcon />
        </IconButton>
        <Typography sx={{ width: 30, textAlign: 'center' }}>{currentValue}</Typography>
        <IconButton onClick={ () => addOrRemove(+1) }>
            <AddIcon />
        </IconButton>
    </>
  )
}
