import { EMeasureUnit, IIngredient, Ingredient } from "./ingredient"

export interface IProduct {
  id: string
  name: string
  slug: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  recipe?: string
  ingredients: IIngredient[]
  subProducts: IProduct[]
  profitMargin: number
  sellingPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface ICreateProduct {
  name: string
  slug: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  recipe?: string
  ingredients?: { id: string, quantity: number, measureUnit: EMeasureUnit }[]
  subProducts?: IProduct[]
  profitMargin: number
  sellingPrice: number
}

export class Product implements IProduct {
  id: string
  name: string
  slug: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  recipe?: string
  ingredients: IIngredient[]
  subProducts: IProduct[]
  profitMargin: number
  sellingPrice: number
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
