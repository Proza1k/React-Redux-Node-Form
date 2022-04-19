import { Express, Request, Response } from 'express'
import { Model } from '../database/types'
import { RoutePath } from './router'

export type callback = <T>(request: Request, response: Response, option?: T) => void

export enum RequestType {
  get = 'get',
  post = 'post',
}

export type Route<T> = {
  isEnabled: boolean
  path: string
  type: RequestType
  option?: T
  callback: callback
}

export interface RouterPayload {
  routes: (database: Model) => Route<unknown>[]
  app: Express
  database: Model
}
