import BaseRepository from 'node-crud-kit/lib/bases/base.repository'
import { Model, Repository } from '../database/types'

import IUser from '../interfaces/user.interface'

export default class UserRepository extends BaseRepository<IUser> {
  db: Model

  database: Repository

  public constructor(db: Model) {
    super(db)
    this.db = db
  }

  public async createUser(login: string, password: string, nickname: string): Promise<void> {
    await this.db.User.create({
      login,
      password,
      nickname,
    })
  }

  public async getUserByLogin(login: string): Promise<IUser | null> {
    const user = await this.db.User.findOne({
      where: {
        login,
      },
    })

    if (!user) {
      return null
    }

    return user
  }
}
