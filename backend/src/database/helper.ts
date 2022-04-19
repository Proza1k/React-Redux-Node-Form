import Sequelize from 'sequelize'
import ContactModel from '../models/contact.model'
import UserModel from '../models/user.model'
import ContactRepository from '../repositories/contact.repository'
import UserRepository from '../repositories/user.repository'
import { DATABASE } from '../tools/environment'
import { logger } from '../tools/logger'
import { Model } from './types'

const connect = (): Model => {
  try {
    logger(`Database connection statused:`)
    const sequelize = new Sequelize.Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
      dialect: DATABASE.dialect as any,
      host: DATABASE.host,
      port: DATABASE.port,
      define: {
        timestamps: false,
      },
    })

    const options = DATABASE.options

    sequelize
      .sync({ alter: true })
      .then(() => {
        logger(`Database connection is success`)
      })
      .catch((error) => {
        logger(`Database connection is error: ${error}`)
      })

    const User = sequelize.define(DATABASE.table.user, UserModel, options)
    const Contact = sequelize.define(DATABASE.table.contact, ContactModel, options)

    return {
      User,
      Contact,
    }
  } catch (error) {
    logger(`Database connection failed: ${error}`)
  }
}

export const getDatabase = (): Model => {
  const db: Model = connect()

  return db
}

export const getRepository = (models: Model) => ({
  user: new UserRepository(models),
  contact: new ContactRepository(models),
})
