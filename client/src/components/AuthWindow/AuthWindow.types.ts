export type AuthWindowInputs = {
  login: string
  password: string
  nickname: string
}

export enum AuthWindowFields {
  login = 'login',
  password = 'password',
  nickname = 'nickname',
}

export enum AuthWindowState {
  login = 'login',
  register = 'register',
}
