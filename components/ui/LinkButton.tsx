import { Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
    href: string;
    title: string;
    size?: number;

}

export const LinkButton: FC<Props> = ({ href, title, size = 12 }) => {
  return (
    <NextLink href={ href } passHref>
        <Link>
            <Button variant='text' size='small' sx={{ fontSize: {xs: size-3, md: size}}}>{ title }</Button>
        </Link>
    </NextLink>
  )
}
