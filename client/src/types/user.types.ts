export type User = {
  id: number
  name: string
  photo?: string
}

export type AuthPayload = {
  login: string
  password: string
}
