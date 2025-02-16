import { FC } from 'react'
import { IHintTextProps } from './types'
import './styles.css'

export const HintText: FC<IHintTextProps> = ({children, className}) => {
  return (
    <div className={`hint ${className}`}>{children}</div>
  )
}