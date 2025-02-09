import { EMeasureUnit, IIngredient, Ingredient } from "./ingredient"

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

export class Product implements IProduct {
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

  constructor(data: IProduct) {
    Object.assign(this, data)

    this.ingredients = data.ingredients.map((ingredient) => new Ingredient(ingredient))
    this.subProducts = data.subProducts.map((product) => new Product(product))
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
