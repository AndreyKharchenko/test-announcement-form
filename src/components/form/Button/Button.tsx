import { FC } from 'react'
import { IButtonProps } from './types'
import './style.css'

export const Button: FC<IButtonProps> = ({variant, color, type, className, handleClick, children}) => {
  return (
    <button 
        className={`button ${variant} ${className}`} 
        onClick={handleClick}
        type={type}
        style={{backgroundColor: color || 'transparent'}}
    >
        {children}
    </button>
  )
}