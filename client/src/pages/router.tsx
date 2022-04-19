import { Personal } from './Personal'
import { Route, Routes } from './AppRouter.types'
import { onNavigation } from './AppRouter.utils'

export const useRoutes = (): Route[] => [
  {
    path: Routes.PERSONAL,
    isRouteEnabled: true,
    isNavigationEnabled: true,
    element: <Personal />,
    title: 'Personal',
    onClick: onNavigation,
  },
]
