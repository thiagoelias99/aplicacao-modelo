import { EMeasureUnit, IIngredient } from "./ingredient"

export interface IProduct {
  id: string
  name: string
  slug: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  ingredients: IIngredient[]
  subProducts: IProduct[]
  createdAt: Date
  updatedAt: Date
}

export interface IProductCreate {
  name: string
  slug?: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  ingredients: { id: string, quantity: number, measureUnit: EMeasureUnit }[]
  // subProducts: IProduct[]
}
