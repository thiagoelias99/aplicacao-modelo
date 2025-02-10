import { formatCurrency } from "@/lib/utils"

export interface IIngredient {
  id: string
  name: string
  slug: string
  description?: string
  measureUnitClass: EMeasureUnitClass
  measureUnit: EMeasureUnit
  measureUnitQuantity: number
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface ICreateIngredient {
  name: string
  slug?: string
  description?: string
  measureUnitClass: EMeasureUnitClass
  measureUnit: EMeasureUnit
  measureUnitQuantity: number
  price: number
}

// ENUMS
export enum EMeasureUnitClass {
  VOLUME = 'VOLUME',
  MASS = 'MASS',
  QUANTITY = 'QUANTITY'
}

export enum EMeasureUnit {
  // VOLUME
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  TEASPOON = 'TEASPOON',
  TABLESPOON = 'TABLESPOON',
  CUP = 'CUP',

  // MASS
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',

  // QUANTITY
  UNIT = 'UNIT'
}

type EMeasureUnitClassMapper = {
  label: string
  mainUnit: EMeasureUnit
  primaryUnits: EMeasureUnit[]
  secondaryUnits: EMeasureUnit[]
  allUnits: EMeasureUnit[]
}

export const EMeasureUnitClassMapper: Record<EMeasureUnitClass, EMeasureUnitClassMapper> = {
  [EMeasureUnitClass.MASS]: {
    label: 'Peso',
    mainUnit: EMeasureUnit.KILOGRAM,
    primaryUnits: [EMeasureUnit.GRAM, EMeasureUnit.KILOGRAM],
    secondaryUnits: [],
    allUnits: [EMeasureUnit.GRAM, EMeasureUnit.KILOGRAM]
  },
  [EMeasureUnitClass.VOLUME]: {
    label: 'Volume',
    mainUnit: EMeasureUnit.LITER,
    primaryUnits: [EMeasureUnit.LITER, EMeasureUnit.MILLILITER],
    secondaryUnits: [EMeasureUnit.TEASPOON, EMeasureUnit.TABLESPOON, EMeasureUnit.CUP],
    allUnits: [EMeasureUnit.LITER, EMeasureUnit.MILLILITER, EMeasureUnit.TEASPOON, EMeasureUnit.TABLESPOON, EMeasureUnit.CUP]
  },
  [EMeasureUnitClass.QUANTITY]: {
    label: 'Unidades',
    mainUnit: EMeasureUnit.UNIT,
    primaryUnits: [EMeasureUnit.UNIT],
    secondaryUnits: [],
    allUnits: [EMeasureUnit.UNIT]
  }
}

type EMeasureUnitMapper = {
  unit: string
  description: string
  mainUnitRatio: number
}

export const EMeasureUnitMapper: Record<EMeasureUnit, EMeasureUnitMapper> = {
  [EMeasureUnit.LITER]: {
    unit: 'L',
    description: 'Litro',
    mainUnitRatio: 1
  },
  [EMeasureUnit.MILLILITER]: {
    unit: 'mL',
    description: 'Mililitro',
    mainUnitRatio: 0.001
  },
  [EMeasureUnit.TEASPOON]: {
    unit: 'colher de chá',
    description: 'Colher de chá',
    mainUnitRatio: 0.005
  },
  [EMeasureUnit.TABLESPOON]: {
    unit: 'colher de sopa',
    description: 'Colher de sopa',
    mainUnitRatio: 0.015
  },
  [EMeasureUnit.CUP]: {
    unit: 'xícara',
    description: 'Xícara',
    mainUnitRatio: 0.24
  },
  [EMeasureUnit.KILOGRAM]: {
    unit: 'kg',
    description: 'Quilograma',
    mainUnitRatio: 1
  },
  [EMeasureUnit.GRAM]: {
    unit: 'g',
    description: 'Grama',
    mainUnitRatio: 0.001
  },
  [EMeasureUnit.UNIT]: {
    unit: 'un',
    description: 'Unidade',
    mainUnitRatio: 1
  }
}

export class Ingredient implements IIngredient {
  public id: string
  public name: string
  public slug: string
  public description: string
  public measureUnitClass: EMeasureUnitClass
  public measureUnit: EMeasureUnit
  public measureUnitQuantity: number
  public price: number
  public createdAt: Date
  public updatedAt: Date

  constructor(data: IIngredient) {
    Object.assign(this, data)

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  get mainUnit(): EMeasureUnit {
    return EMeasureUnitClassMapper[this.measureUnitClass].mainUnit
  }

  get pricePerUnit(): number {
    return this.price / this.measureUnitQuantity / EMeasureUnitMapper[this.measureUnit].mainUnitRatio
  }

  get formattedPricePerUnit(): string {
    return formatCurrency(this.pricePerUnit) + ` / ${EMeasureUnitMapper[EMeasureUnitClassMapper[this.measureUnitClass].mainUnit].unit}`
  }

  static getFormattedPricePerUnit(price?: number, measureUnit?: EMeasureUnit, measureUnitQuantity?: number, measureUnitClass?: EMeasureUnitClass): string {
    if (!price || !measureUnit || !measureUnitQuantity || !measureUnitClass) return ''

    const value = price / measureUnitQuantity / EMeasureUnitMapper[measureUnit].mainUnitRatio
    if (Number.isNaN(value)) return ''
    return formatCurrency(value) + ` / ${EMeasureUnitMapper[EMeasureUnitClassMapper[measureUnitClass].mainUnit].unit}`
  }
}