import React from 'react'
import { FieldError, Path, UseFormRegister, ValidationRule } from 'react-hook-form'

import cx from 'classnames'
import css from './Input.module.scss'

export type InputProps<T> = {
  label: Path<T>
  register: UseFormRegister<T>
  required: boolean
  type: string
  error?: FieldError
  className?: string
  pattern?: ValidationRule<RegExp>
  placeholder?: string
}

export const Input = <T,>({
  label,
  register,
  required,
  pattern,
  className,
  type,
  placeholder,
  error,
}: InputProps<T>) => {
  return (
    <div className={cx(css.input_container, className)}>
      <span className={cx(css.input_placeholder)}>{placeholder}</span>
      <input
        {...register(label, {
          required,
          pattern,
        })}
        className={cx(
          css.input,
          {
            [css.input_invalid]: error,
          },
          className,
        )}
        name={label}
        type={type}
      />
    </div>
  )
}
