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
  UNIT = 'UNIT',
  BOX = 'BOX',
  DOZEN = 'DOZEN'
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
    mainUnit: EMeasureUnit.GRAM,
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
    primaryUnits: [EMeasureUnit.UNIT, EMeasureUnit.DOZEN],
    secondaryUnits: [EMeasureUnit.BOX],
    allUnits: [EMeasureUnit.UNIT, EMeasureUnit.BOX, EMeasureUnit.DOZEN]
  }
}

type EMeasureUnitMapper = {
  unit: string
  description: string
}

export const EMeasureUnitMapper: Record<EMeasureUnit, EMeasureUnitMapper> = {
  [EMeasureUnit.LITER]: {
    unit: 'L',
    description: 'Litro'
  },
  [EMeasureUnit.MILLILITER]: {
    unit: 'mL',
    description: 'Mililitro'
  },
  [EMeasureUnit.TEASPOON]: {
    unit: 'colher de chá',
    description: 'Colher de chá'
  },
  [EMeasureUnit.TABLESPOON]: {
    unit: 'colher de sopa',
    description: 'Colher de sopa'
  },
  [EMeasureUnit.CUP]: {
    unit: 'xícara',
    description: 'Xícara'
  },
  [EMeasureUnit.GRAM]: {
    unit: 'g',
    description: 'Grama'
  },
  [EMeasureUnit.KILOGRAM]: {
    unit: 'kg',
    description: 'Quilograma'
  },
  [EMeasureUnit.UNIT]: {
    unit: 'un',
    description: 'Unidade'
  },
  [EMeasureUnit.BOX]: {
    unit: 'caixa',
    description: 'Caixa'
  },
  [EMeasureUnit.DOZEN]: {
    unit: 'dúzia',
    description: 'Dúzia'
  }
}