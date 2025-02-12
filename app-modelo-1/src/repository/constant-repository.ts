import { EConstants } from "@/lib/constants"

export interface IConstant {
  key: EConstants,
  value: string
}

export interface IConstantRepository {
  saveConstant(data: IConstant): Promise<IConstant>
  saveConstants(data: IConstant[]): Promise<IConstant[]>
  getConstant(constant: EConstants): Promise<IConstant | null>
  getConstants(constants: EConstants[]): Promise<IConstant[]>
}