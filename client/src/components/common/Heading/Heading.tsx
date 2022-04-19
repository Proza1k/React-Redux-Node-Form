import React from 'react'

import cx from 'classnames'
import css from './Heading.module.scss'

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type HeadingProps = {
  value: string
  size: Size
  className?: string
}

export const Heading = ({ value, size = Size.medium, className }: HeadingProps) => {
  return (
    <h1
      className={cx(
        css.heading,
        {
          [css.heading_small]: size === Size.small,
          [css.heading_medium]: size === Size.medium,
          [css.heading_large]: size === Size.large,
        },
        className,
      )}
    >
      {value}
    </h1>
  )
}
