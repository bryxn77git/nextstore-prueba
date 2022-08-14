import { FC } from 'react';
import { Typography, useMediaQuery, useTheme } from "@mui/material";

interface Props {
    title: string;
}

export const TitleUi: FC<Props> = ({ title }) => {

    const theme = useTheme();
    const titleSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h4' : 'h6';

  return (
    <Typography variant={titleSize} fontWeight={800} >{ title }</Typography>
  )
}
