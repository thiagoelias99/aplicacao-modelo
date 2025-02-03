export interface IUser {
  id: string
  givenName: string
  familyName: string
  email: string
  role: ERole
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}


// ENUMS
export enum ERole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

type ERoleEnumMapper = {
  label: string
}

export const ERoleEnumMapper: Record<ERole, ERoleEnumMapper> = {
  [ERole.ADMIN]: {
    label: 'Administrador'
  },
  [ERole.MANAGER]: {
    label: 'Gerente'
  },
  [ERole.USER]: {
    label: 'Usuário'
  }
}

