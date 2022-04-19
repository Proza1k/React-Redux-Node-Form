import type { Response, Request } from 'express'
import BaseRouter from 'node-crud-kit/lib/bases/base.router'

import { getRepository } from '../database/helper'
import { Model, Repository } from '../database/types'
import IContact from '../interfaces/contact.interface'

export default class ContactRouter extends BaseRouter<IContact> {
  db: Model
  database: Repository

  public constructor(db: Model) {
    super(db)
    this.db = db
    this.database = getRepository(db)
  }

  create = async (request: Request, response: Response) => {
    const { user, name, value } = request.body

    await this.database.contact.create(user, name, value)
    const contact = await this.database.contact.getUserContact(user)

    response.send({
      status: 200,
      message: 'Contact created',
      payload: contact,
    })
  }

  delete = async (request: Request, response: Response) => {
    const { id, user } = request.body
    const checkContact: IContact = await this.database.contact.getContact(id, user)
    if (checkContact) {
      await this.database.contact.delete(id, user)
      const contact = await this.database.contact.getUserContact(user)

      response.send({
        status: 200,
        message: 'Contact deleted',
        payload: contact,
      })
    }

    response.send({
      status: 404,
      message: 'Contact not found',
      payload: null,
    })
  }

  get = async (request: Request, response: Response) => {
    const { user } = request.body

    const contact = await this.database.contact.getUserContact(user)

    if (contact) {
      response.send({
        status: 200,
        message: 'Contact found',
        payload: contact,
      })
    } else {
      response.send({
        status: 404,
        message: 'Contact not found',
        payload: null,
      })
    }
  }
}
