import { ERole, IUser } from "@/models/user"

export interface IUserRepository {
  setUserRole(email: string[], role: ERole): Promise<void>
  saveUser(data: Partial<IUser>): Promise<IUser>
  getUserByEmail(email: string): Promise<IUser | null>
  deleteUserAccount(data: { email?: string, id?: string }): Promise<void>
  getUsers(): Promise<IUser[]>
}