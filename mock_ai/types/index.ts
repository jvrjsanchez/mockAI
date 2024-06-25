import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
    href: string;
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
}
