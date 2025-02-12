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
  ingredients: {
    ingredient: IIngredient
    quantity: number
    measureUnit: EMeasureUnit
  }[]
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

export interface IUpdateProduct extends ICreateProduct {
  id: string
}

export class Product {
  id: string
  name: string
  slug: string
  description?: string
  preparationTime: number
  yield: number
  annotation?: string
  recipe?: string
  ingredients: {
    ingredient: Ingredient
    quantity: number
    measureUnit: EMeasureUnit
  }[]
  subProducts: IProduct[]
  profitMargin: number
  sellingPrice: number
  createdAt: Date
  updatedAt: Date

  private taxes: {
    pickUpTax: number
    privateDeliveryTax: number
    iFoodDeliveryTax: number
  }

  constructor(data: IProduct) {
    Object.assign(this, data)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    this.ingredients = data.ingredients.map((ingredient) => ({
      ingredient: new Ingredient(ingredient.ingredient),
      quantity: ingredient.quantity,
      measureUnit: ingredient.measureUnit
    }))
    this.subProducts = data.subProducts.map((product) => new Product(product))
  }

  setTaxes(data: {
    pickUpTax: number,
    privateDeliveryTax: number,
    iFoodDeliveryTax: number
  }) {
    this.taxes = data
  }

  getSellingPricesWithTaxes(): {
    pickUpPrice: number
    privateDeliveryPrice: number
    iFoodDeliveryPrice: number
  } {
    const pickUpPrice = this.sellingPrice * (1 + this.taxes.pickUpTax / 100)
    const privateDeliveryPrice = this.sellingPrice * (1 + this.taxes.privateDeliveryTax / 100)
    const iFoodDeliveryPrice = this.sellingPrice * (1 + this.taxes.iFoodDeliveryTax / 100)

    return {
      pickUpPrice,
      privateDeliveryPrice,
      iFoodDeliveryPrice
    }
  }
}
