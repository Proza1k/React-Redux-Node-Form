import bcrypt from 'bcrypt'

export const createHash = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(value, salt)
}

export const validHash = async (formUserPassword: string, currentUserPassword: string): Promise<boolean> => {
  const hash = await createHash(formUserPassword)
  return await bcrypt.compare(currentUserPassword, hash)
}
