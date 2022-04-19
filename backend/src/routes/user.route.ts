import type { Response, Request } from 'express'
import BaseRouter from 'node-crud-kit/lib/bases/base.router'

import { getRepository } from '../database/helper'
import { Model, Repository } from '../database/types'
import IUser from '../interfaces/user.interface'
import { createHash, validHash } from '../helpers/hash.helper'

export default class UserRouter extends BaseRouter<IUser> {
  db: Model
  database: Repository

  public constructor(db: Model) {
    super(db)
    this.db = db
    this.database = getRepository(db)
  }

  login = async (request: Request, response: Response) => {
    const { login, password }: IUser = request.body

    const user = await this.database.user.getUserByLogin(login)

    if (user) {
      const isValidPassword = validHash(password, user.password)
      if (isValidPassword) {
        response.send({
          status: 200,
          payload: {
            id: user.id,
            name: user.nickname,
          },
        })
      } else {
        response.send({
          status: 404,
          message: 'User not valid',
          payload: null,
        })
      }
    } else {
      response.send({
        status: 404,
        message: 'User not found',
        payload: null,
      })
    }
  }

  createUser = async (request: Request, response: Response) => {
    const { login, password, nickname } = request.body

    const user = await this.database.user.getUserByLogin(login)

    if (!user) {
      const hash = await createHash(password)
      await this.database.user.createUser(login, hash, nickname)
      const user = await this.database.user.getUserByLogin(login)

      response.send({
        status: 200,
        message: 'User created',
        payload: {
          id: user.id,
          name: user.nickname,
        },
      })
    }

    response.send({
      status: 422,
      payload: null,
      message: 'User already exists',
    })
  }
}
