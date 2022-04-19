import React from 'react'

import cx from 'classnames'
import css from './Button.module.scss'
import { Icon, Icons } from 'src/components/Icon'

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export type ButtonProps = {
  text?: string
  children?: React.ReactNode
  size: Size
  icon?: Icons
  isDisabled?: boolean
  tabindex?: number
  className?: string
  type: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button = ({
  text,
  tabindex,
  isDisabled,
  size = Size.medium,
  className,
  onClick,
  icon,
  children,
}: ButtonProps) => {
  return (
    <button
      className={cx(
        css.button,
        {
          [css.button_small]: size === Size.small,
          [css.button_medium]: size === Size.medium,
          [css.button_large]: size === Size.large,
        },
        className,
      )}
      tabIndex={tabindex}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && <Icon className={cx(css.button_icon)} name={icon} />}
      {text && <span className={cx(css.button_text)}>{text}</span>}
      {children}
    </button>
  )
}
