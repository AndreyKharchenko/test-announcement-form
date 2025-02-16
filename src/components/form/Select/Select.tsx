import { FC } from 'react'
import { ISelectProps } from './types'
import './style.css'
import { useController } from 'react-hook-form'
import ArrowDown from '../../../assets/arrow-down.svg'

export const Select: FC<ISelectProps> = (props) => {
  const {name, label, options, className} = props
  const {field, fieldState} = useController({name})
  const { error } = fieldState
  const { ref, value, onChange } = field

  return (
    <div className="select-wrapper">
      <select
        {...props}
        className={`select ${className} ${error && 'select-error'}`}
        ref={ref}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled className="option">
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="option">
            {option.label}
          </option>
        ))}
      </select>
      <img className="arrow" src={ArrowDown} />
      {error && <p className='error'>{error?.message}</p>}
    </div>
  )
}