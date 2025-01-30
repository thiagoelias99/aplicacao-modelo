import { Role } from "@prisma/client"

type RoleEnumMapper = {
  label: string
}

export const RoleEnumMapper: Record<Role, RoleEnumMapper> = {
  [Role.ADMIN]: {
    label: 'Administrador'
  },
  [Role.MANAGER]: {
    label: 'Gerente'
  },
  [Role.USER]: {
    label: 'Usuário'
  }
}