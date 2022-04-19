import { HeaderRoutes, Route } from './AppRouter.types'

export const filterEnabledRoutes = (routes: Route[]): Route[] => {
  return routes.filter(route => route.isRouteEnabled)
}

export const filterNavigationRoutes = (routes: Route[]): Route[] => {
  return routes.filter(route => route.isNavigationEnabled)
}

export const filterIconRoutes = (routes: Route[]): Route[] => {
  return routes.filter(route => route.imgUrl)
}

export const filterHeaderRoutes = (routes: Route[]): HeaderRoutes => {
  const enabledRoutes = filterEnabledRoutes(routes)
  const navigationRoutes = filterNavigationRoutes(enabledRoutes)
  const imageRoutes = filterIconRoutes(navigationRoutes)

  return {
    imageRoutes,
    navigationRoutes
  }
}

export const onNavigation = () => {
  window.scrollTo(0, 0)
}
