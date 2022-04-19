import React from 'react'

import cx from 'classnames'
import css from './Image.module.scss'

export type ImageType = {
  width?: number
  height?: number
  src: string
  alt: string
  className?: string
  onClick?: () => void
}

export const Image = ({ width, height, src, alt, className, onClick }: ImageType) => {
  return (
    <img src={src} width={width} height={height} alt={alt} className={cx(css.image, className)} onClick={onClick} />
  )
}
