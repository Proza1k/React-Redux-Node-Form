import BaseRepository from 'node-crud-kit/lib/bases/base.repository'
import { Model, Repository } from '../database/types'

import IContact from '../interfaces/contact.interface'

export default class ContactRepository extends BaseRepository<IContact> {
  db: Model

  database: Repository

  public constructor(db: Model) {
    super(db)
    this.db = db
  }

  public async create(user: string, name: string, value: string): Promise<void> {
    await this.db.Contact.create({
      user,
      name,
      value,
    })
  }

  public async getContact(id: number, user: number): Promise<IContact | null> {
    const contact = await this.db.Contact.findOne({
      where: {
        id,
        user,
      },
    })

    if (!contact) {
      return null
    }

    return contact
  }

  public async delete(id: number, user: number): Promise<void> {
    await this.db.Contact.destroy({
      where: {
        id,
        user,
      },
    })
  }

  public async getUserContact(user: number): Promise<IContact[] | null> {
    const contact = await this.db.Contact.findAll({
      where: {
        user,
      },
    })

    if (!contact) {
      return null
    }

    return contact
  }
}
