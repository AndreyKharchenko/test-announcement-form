import { FC } from 'react'
import { IRadioProps } from './types'
import './style.css'
import { useController } from 'react-hook-form'

export const Radio: FC<IRadioProps> = (props) => {
  const {name, options, defaultValue} = props
  const {field, fieldState} = useController({name, defaultValue})
  const { error } = fieldState
  const { ref, value, onChange } = field

  return (
    <div className="radio-wrapper">
      {options.map((option) => (
        <div className="radio-btn" key={option.value}>
          <input
            type="radio"
            id={`${name}-${option.value}`}
            value={option.value}
            onChange={onChange}
            checked={String(value) === String(option.value)}
            ref={ref}
            {...props}
            className="radio"
          />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
      {error && <p className="error">{error?.message}</p>}
    </div>
  )
}