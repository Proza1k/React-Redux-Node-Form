import { ReactComponent as UserImage } from '../../images/user.svg'
import { ReactComponent as PlusImage } from '../../images/plus.svg'
import { ReactComponent as TrashImage } from '../../images/trash.svg'
import { ReactComponent as EditImage } from '../../images/edit.svg'
import { ReactComponent as LogoutImage } from '../../images/logout.svg'

import { Icons } from './Icon.types'

export const ICONS: Record<Icons | string, SVGIcon> = {
  [Icons.user]: UserImage,
  [Icons.plus]: PlusImage,
  [Icons.logout]: LogoutImage,
  [Icons.trash]: TrashImage,
  [Icons.edit]: EditImage
}

export const getIcon = (name: Icons | string) => {
  return ICONS[name]
}
