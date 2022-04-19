import React from 'react'

import { Icons } from './Icon.types'
import { getIcon } from './Icon.utils'

export type IconProps = {
  name: Icons | string
  onClick?: () => void
  className?: string
}

export const Icon = ({ name, onClick, className }: IconProps) => {
  const IconComponent = getIcon(name)

  return (
    <div className={className} onClick={onClick}>
      <IconComponent />
    </div>
  )
}
