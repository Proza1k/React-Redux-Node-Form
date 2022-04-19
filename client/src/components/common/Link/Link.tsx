import React from 'react'

import cx from 'classnames'
import css from './Link.module.scss'

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type LinkProps = {
  text: string
  size: Size
  href?: string
  className?: string
  onClick?: () => void
}

export const Link = ({ href, text, size, className, onClick }: LinkProps) => (
  <a
    className={cx(
      css.link,
      {
        [css.link_small]: size === Size.small,
        [css.link_medium]: size === Size.medium,
        [css.link_large]: size === Size.large,
      },
      className,
    )}
    href={href}
    onClick={onClick}
  >
    {text}
  </a>
)
