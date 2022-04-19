import ContactRepository from '../repositories/contact.repository'
import UserRepository from '../repositories/user.repository'

export type Model = {
  User: any
  Contact: any
}

export type Repository = {
  user: UserRepository
  contact: ContactRepository
}
