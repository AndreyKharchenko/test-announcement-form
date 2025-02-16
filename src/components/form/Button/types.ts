import { ReactNode } from "react"

export interface IButtonProps {
    handleClick?: () => void
    variant: 'contained' | 'outlined'
    color?: string
    type?: 'button' | 'reset' | 'submit'
    children: ReactNode
    className?: string
}