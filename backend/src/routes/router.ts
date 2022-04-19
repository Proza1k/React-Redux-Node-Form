import express, { Router, Request, Response, RequestHandler } from 'express'
import { Model } from '../database/types'
import { logger } from '../tools/logger'
import ContactRouter from './contact.route'
import { getStatus } from './status'
import { RequestType, Route, RouterPayload } from './types'
import UserRouter from './user.route'

export const RoutePath = {
  status: '/status',
  user: '/user',
  register: '/user/register',
  login: '/user/login',
  contact: {
    create: '/contact/create',
    get: '/contact/get',
    delete: '/contact/delete',
  },
}

const setupRoute = <T>(router: Router, route: Route<T>): void => {
  if (route.isEnabled) {
    logger(route.path)

    router[route.type](route.path, (request: Request, response: Response) => {
      logger(route)
      route.callback(request, response, route.option)
    })
  }

  logger({ path: route.path, status: route.isEnabled })
}

const initRoutes = (router: Router, routes: Route<unknown>[]) => {
  routes.forEach((route) => {
    setupRoute(router, route)
  })

  return router
}

export const setupRoutes = (payload: RouterPayload): RequestHandler => {
  const { routes, database } = payload

  const router = express.Router()

  return initRoutes(router, routes(database))
}

export const routes = (database: Model): Route<unknown>[] => {
  const userRouter = new UserRouter(database)
  const contactRouter = new ContactRouter(database)

  // User routes
  const login = (): Route<unknown> => ({
    isEnabled: true,
    path: RoutePath.login,
    type: RequestType.post,
    callback: async (request: Request, response: Response) => userRouter.login(request, response),
  })

  const register = (): Route<unknown> => ({
    isEnabled: true,
    path: RoutePath.register,
    type: RequestType.post,
    callback: async (request: Request, response: Response) => userRouter.createUser(request, response),
  })

  // Contact routes
  const createContact = (): Route<unknown> => ({
    isEnabled: true,
    path: RoutePath.contact.create,
    type: RequestType.post,
    callback: async (request: Request, response: Response) => contactRouter.create(request, response),
  })

  const getUserContact = (): Route<unknown> => ({
    isEnabled: true,
    path: RoutePath.contact.get,
    type: RequestType.post,
    callback: async (request: Request, response: Response) => contactRouter.get(request, response),
  })

  const deleteContact = (): Route<unknown> => ({
    isEnabled: true,
    path: RoutePath.contact.delete,
    type: RequestType.post,
    callback: async (request: Request, response: Response) => contactRouter.delete(request, response),
  })

  return [getStatus(), login(), register(), createContact(), getUserContact(), deleteContact()]
}
