import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { useRoutes } from './router'
import { filterEnabledRoutes } from './AppRouter.utils'

export const AppRouter = () => {
  const routes = useRoutes()
  const enabledRoutes = filterEnabledRoutes(routes)

  return (
    <Routes>
      {enabledRoutes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.element} />
      })}
    </Routes>
  )
}
