import { FC, useState } from 'react'
import { ITextareaProps } from './types'
import './style.css'
import { useController } from 'react-hook-form'

export const Textarea: FC<ITextareaProps> = (props) => {
  const {name, className, isRequired, placeholder, onFocus, ...textareaProps} = props
  const { field, fieldState } = useController({ name })
  const { error } = fieldState
  const { onChange, onBlur, value } = field
   const [isFocused, setIsFocused] = useState(false)
  return (
    <div className="textarea-wrapper">
      {(value === '' && !isFocused) && (
        <label
          className="textarea-label"
        >
          {placeholder} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <textarea
        {...textareaProps}
        {...field}
        onChange={(e) => {
          onChange?.(e)
          textareaProps.onChange?.(e)
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
        className={`textarea ${className} ${error && 'textarea-error'}`}
      />
      {error && <p className="error">{error?.message}</p>}
    </div>
  )
}