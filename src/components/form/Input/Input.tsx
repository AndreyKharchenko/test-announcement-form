import { FC, useState } from 'react'
import './style.css'
import { IInputProps } from './types'
import { useController } from 'react-hook-form'

export const Input: FC<IInputProps>  = (props) => {
  const {name, className, isRequired, onFocus, placeholder, ...inputProps} = props
  const { field, fieldState } = useController({ name })
  const { error } = fieldState
  const { onChange, onBlur, value } = field
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div className="input-wrapper">
      <input
        {...inputProps}
        {...field}
        onChange={(e) => {
          onChange?.(e)
          inputProps.onChange?.(e)
        }}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={() => {
          setIsFocused(false)
          onBlur?.()
        }}
        value={value}
        className={`input ${className} ${error && 'input-error'}`}
      />
      {(value === '' && !isFocused) && (
        <label
          className="input-label"
        >
          {placeholder} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      {error && <p className="error">{error?.message}</p>}
    </div>
  )
}