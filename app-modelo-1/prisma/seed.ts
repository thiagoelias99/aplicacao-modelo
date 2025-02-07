/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client")
const { randomUUID } = require("node:crypto")

const prismaClient = new PrismaClient()

enum EMeasureUnitClass {
  VOLUME = 'VOLUME',
  MASS = 'MASS',
  QUANTITY = 'QUANTITY'
}

enum EMeasureUnit {
  // VOLUME
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',

  // MASS
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',

  // QUANTITY
  UNIT = 'UNIT'
}

const ingredients = [
  {
    id: randomUUID(),
    name: "Tomate",
    slug: "tomate",
    description: "Tomate fresco",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 6,
    price: 2.5
  },
  {
    id: randomUUID(),
    name: "Cebola",
    slug: "cebola",
    description: "Cebola branca média",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 4,
    price: 3.0
  },
  {
    id: randomUUID(),
    name: "Alho",
    slug: "alho",
    description: "Dente de alho",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 10,
    price: 4.0
  },
  {
    id: randomUUID(),
    name: "Leite",
    slug: "leite",
    description: "Leite integral",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.LITER,
    measureUnitQuantity: 1,
    price: 5.0
  },
  {
    id: randomUUID(),
    name: "Farinha de Trigo",
    slug: "farinha-de-trigo",
    description: "Farinha de trigo tradicional",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 1,
    price: 4.5
  },
  {
    id: randomUUID(),
    name: "Açúcar",
    slug: "acucar",
    description: "Açúcar refinado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 1,
    price: 3.2
  },
  {
    id: randomUUID(),
    name: "Sal",
    slug: "sal",
    description: "Sal refinado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 1.5
  },
  {
    id: randomUUID(),
    name: "Óleo de Soja",
    slug: "oleo-de-soja",
    description: "Óleo de soja refinado",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.LITER,
    measureUnitQuantity: 1,
    price: 8.0
  },
  {
    id: randomUUID(),
    name: "Manteiga",
    slug: "manteiga",
    description: "Manteiga sem sal",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 7.0
  },
  {
    id: randomUUID(),
    name: "Ovos",
    slug: "ovos",
    description: "Ovos brancos",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 12,
    price: 12.0
  },
  {
    id: randomUUID(),
    name: "Fermento em Pó",
    slug: "fermento-em-po",
    description: "Fermento químico",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 100,
    price: 3.0
  },
  {
    id: randomUUID(),
    name: "Leite Condensado",
    slug: "leite-condensado",
    description: "Leite condensado adoçado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 395,
    price: 6.5
  },
  {
    id: randomUUID(),
    name: "Queijo Mussarela",
    slug: "queijo-mussarela",
    description: "Queijo mussarela fatiado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 18.0
  },
  {
    id: randomUUID(),
    name: "Presunto",
    slug: "presunto",
    description: "Presunto fatiado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 16.0
  },
  {
    id: randomUUID(),
    name: "Macarrão Espaguete",
    slug: "macarrao-espaguete",
    description: "Massa de macarrão tipo espaguete",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 5.5
  },
  {
    id: randomUUID(),
    name: "Carne Moída",
    slug: "carne-moida",
    description: "Carne moída de primeira",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 1,
    price: 28.0
  },
  {
    id: randomUUID(),
    name: "Frango",
    slug: "frango",
    description: "Peito de frango sem osso",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 1,
    price: 18.5
  },
  {
    id: randomUUID(),
    name: "Arroz",
    slug: "arroz",
    description: "Arroz branco tipo 1",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 5,
    price: 22.0
  },
  {
    id: randomUUID(),
    name: "Feijão",
    slug: "feijao",
    description: "Feijão carioca",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.KILOGRAM,
    measureUnitQuantity: 1,
    price: 7.5
  },
  {
    id: randomUUID(),
    name: "Molho de Tomate",
    slug: "molho-de-tomate",
    description: "Molho de tomate tradicional",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.MILLILITER,
    measureUnitQuantity: 340,
    price: 4.0
  },
  {
    id: randomUUID(),
    name: "Creme de Leite",
    slug: "creme-de-leite",
    description: "Creme de leite de caixinha",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 3.8
  },
  {
    id: randomUUID(),
    name: "Cenoura",
    slug: "cenoura",
    description: "Cenoura fresca",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 5,
    price: 4.0
  },
  {
    id: randomUUID(),
    name: "Batata",
    slug: "batata",
    description: "Batata inglesa média",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 6,
    price: 5.0
  },
  {
    id: randomUUID(),
    name: "Pimenta-do-reino",
    slug: "pimenta-do-reino",
    description: "Pimenta-do-reino moída",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 50,
    price: 2.5
  },
  {
    id: randomUUID(),
    name: "Orégano",
    slug: "oregano",
    description: "Orégano seco",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 30,
    price: 2.0
  },
  {
    id: randomUUID(),
    name: "Manjericão",
    slug: "manjericao",
    description: "Folhas frescas de manjericão",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 10,
    price: 3.5
  },
  {
    id: randomUUID(),
    name: "Coentro",
    slug: "coentro",
    description: "Maço de coentro fresco",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 1,
    price: 2.0
  },
  {
    id: randomUUID(),
    name: "Salsinha",
    slug: "salsinha",
    description: "Maço de salsinha fresca",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 1,
    price: 2.0
  },
  {
    id: randomUUID(),
    name: "Cebolinha",
    slug: "cebolinha",
    description: "Maço de cebolinha fresca",
    measureUnitClass: EMeasureUnitClass.QUANTITY,
    measureUnit: EMeasureUnit.UNIT,
    measureUnitQuantity: 1,
    price: 2.0
  },
  {
    id: randomUUID(),
    name: "Gengibre",
    slug: "gengibre",
    description: "Raiz de gengibre fresco",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 4.0
  },
  {
    id: randomUUID(),
    name: "Canela em pó",
    slug: "canela-em-po",
    description: "Canela em pó para receitas doces",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 50,
    price: 3.0
  },
  {
    id: randomUUID(),
    name: "Cravo-da-Índia",
    slug: "cravo-da-india",
    description: "Cravo-da-Índia inteiro",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 30,
    price: 2.5
  },
  {
    id: randomUUID(),
    name: "Noz-moscada",
    slug: "noz-moscada",
    description: "Noz-moscada ralada",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 30,
    price: 3.5
  },
  {
    id: randomUUID(),
    name: "Mel",
    slug: "mel",
    description: "Mel de abelha puro",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.MILLILITER,
    measureUnitQuantity: 500,
    price: 15.0
  },
  {
    id: randomUUID(),
    name: "Vinagre de maçã",
    slug: "vinagre-de-maca",
    description: "Vinagre de maçã orgânico",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.LITER,
    measureUnitQuantity: 1,
    price: 8.0
  },
  {
    id: randomUUID(),
    name: "Mostarda",
    slug: "mostarda",
    description: "Mostarda amarela",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.MILLILITER,
    measureUnitQuantity: 200,
    price: 5.0
  },
  {
    id: randomUUID(),
    name: "Maionese",
    slug: "maionese",
    description: "Maionese tradicional",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.MILLILITER,
    measureUnitQuantity: 500,
    price: 6.0
  },
  {
    id: randomUUID(),
    name: "Chocolate em pó",
    slug: "chocolate-em-po",
    description: "Chocolate em pó 50% cacau",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 7.0
  },
  {
    id: randomUUID(),
    name: "Coco ralado",
    slug: "coco-ralado",
    description: "Coco seco ralado",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 100,
    price: 3.5
  },
  {
    id: randomUUID(),
    name: "Leite em pó",
    slug: "leite-em-po",
    description: "Leite integral em pó",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 400,
    price: 15.0
  },
  {
    id: randomUUID(),
    name: "Azeite de oliva",
    slug: "azeite-de-oliva",
    description: "Azeite de oliva extra virgem",
    measureUnitClass: EMeasureUnitClass.VOLUME,
    measureUnit: EMeasureUnit.MILLILITER,
    measureUnitQuantity: 500,
    price: 20.0
  },
  {
    id: randomUUID(),
    name: "Castanha-do-pará",
    slug: "castanha-do-para",
    description: "Castanha-do-pará sem casca",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 18.0
  },
  {
    id: randomUUID(),
    name: "Amêndoas",
    slug: "amendoas",
    description: "Amêndoas sem casca",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 15.0
  },
  {
    id: randomUUID(),
    name: "Aveia em flocos",
    slug: "aveia-em-flocos",
    description: "Aveia em flocos finos",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 6.0
  },
  {
    id: randomUUID(),
    name: "Lentilha",
    slug: "lentilha",
    description: "Lentilha seca",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 8.0
  },
  {
    id: randomUUID(),
    name: "Grão-de-bico",
    slug: "grao-de-bico",
    description: "Grão-de-bico seco",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 9.0
  },
  {
    id: randomUUID(),
    name: "Ervilha",
    slug: "ervilha",
    description: "Ervilha seca",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 7.0
  },
  {
    id: randomUUID(),
    name: "Castanha de caju",
    slug: "castanha-de-caju",
    description: "Castanha de caju torrada",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 16.0
  },
  {
    id: randomUUID(),
    name: "Linhaça",
    slug: "linhaca",
    description: "Semente de linhaça dourada",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 250,
    price: 5.0
  },
  {
    id: randomUUID(),
    name: "Chia",
    slug: "chia",
    description: "Semente de chia",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 250,
    price: 6.0
  },
  {
    id: randomUUID(),
    name: "Gergelim",
    slug: "gergelim",
    description: "Semente de gergelim branco",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 200,
    price: 4.0
  },
  {
    id: randomUUID(),
    name: "Amido de milho",
    slug: "amido-de-milho",
    description: "Amido de milho para engrossar molhos e caldos",
    measureUnitClass: EMeasureUnitClass.MASS,
    measureUnit: EMeasureUnit.GRAM,
    measureUnitQuantity: 500,
    price: 5.5
  }
]


async function seed() {
  await prismaClient.ingredient.createMany({ data: ingredients })
}

seed()
  .then(async () => {
    await prismaClient.$disconnect()

    console.log("Seed completed  🌱")
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })