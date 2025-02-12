/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client")

const prismaClient = new PrismaClient()

const ingredients = [
  {
    "id": "9f8b1a62-3e5b-4c3b-910e-1a2d0f9e7d54",
    "name": "Tomate",
    "slug": "tomate",
    "description": "Tomate fresco",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 6,
    "price": 2.5
  },
  {
    "id": "b6a03f92-c814-46eb-b940-8b61d9f1c9af",
    "name": "Cebola",
    "slug": "cebola",
    "description": "Cebola branca média",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 4,
    "price": 3.0
  },
  {
    "id": "c3e19d6a-09ff-4bc7-b0f9-f4ddc9a5e375",
    "name": "Alho",
    "slug": "alho",
    "description": "Dente de alho",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 10,
    "price": 4.0
  },
  {
    "id": "7a5d4a89-1b43-4a91-8e99-72fdf9c5e4b3",
    "name": "Leite",
    "slug": "leite",
    "description": "Leite integral",
    "measureUnitClass": "VOLUME",
    "measureUnit": "LITER",
    "measureUnitQuantity": 1,
    "price": 5.0
  },
  {
    "id": "20c49bfa-1ecb-4f58-b0a3-3e721dcd8371",
    "name": "Farinha de Trigo",
    "slug": "farinha-de-trigo",
    "description": "Farinha de trigo tradicional",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 1,
    "price": 4.5
  },
  {
    "id": "9286d272-fc39-4c57-89e5-4a50fd3d2b97",
    "name": "Açúcar",
    "slug": "acucar",
    "description": "Açúcar refinado",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 1,
    "price": 3.2
  },
  {
    "id": "5738e2d8-3f2d-4de3-86f9-1277dc6e7b4c",
    "name": "Sal",
    "slug": "sal",
    "description": "Sal refinado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 1.5
  },
  {
    "id": "5c67e8da-3943-4f11-b36d-c45b6c9e1a5f",
    "name": "Óleo de Soja",
    "slug": "oleo-de-soja",
    "description": "Óleo de soja refinado",
    "measureUnitClass": "VOLUME",
    "measureUnit": "LITER",
    "measureUnitQuantity": 1,
    "price": 8.0
  },
  {
    "id": "f26a09f3-6583-4fc6-bbcb-56a1c4eacbaf",
    "name": "Manteiga",
    "slug": "manteiga",
    "description": "Manteiga sem sal",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 7.0
  },
  {
    "id": "d6b9c0b7-3c8f-4f96-91e0-282e8c3b6e10",
    "name": "Ovos",
    "slug": "ovos",
    "description": "Ovos brancos",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 12,
    "price": 12.0
  },
  {
    "id": "c9b62f94-84a0-41e1-9e8a-3d70589f4a5d",
    "name": "Fermento em Pó",
    "slug": "fermento-em-po",
    "description": "Fermento químico",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 100,
    "price": 3.0
  },
  {
    "id": "b7c70db2-bf49-4e6b-911e-7f5f9236324e",
    "name": "Leite Condensado",
    "slug": "leite-condensado",
    "description": "Leite condensado adoçado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 395,
    "price": 6.5
  },
  {
    "id": "f304dba5-01e2-48e4-92b8-5fce2dbfd4f7",
    "name": "Queijo Mussarela",
    "slug": "queijo-mussarela",
    "description": "Queijo mussarela fatiado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 18.0
  },
  {
    "id": "d2825977-36c1-4415-b74c-63c4b84603fc",
    "name": "Presunto",
    "slug": "presunto",
    "description": "Presunto fatiado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 16.0
  },
  {
    "id": "1f10bda6-0f2b-4b6f-8c93-1ad83a79f0c4",
    "name": "Macarrão Espaguete",
    "slug": "macarrao-espaguete",
    "description": "Massa de macarrão tipo espaguete",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 5.5
  },
  {
    "id": "a5d21d91-4b14-4fa4-92fd-81d7ea1e8aa8",
    "name": "Carne Moída",
    "slug": "carne-moida",
    "description": "Carne moída de primeira",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 1,
    "price": 28.0
  },
  {
    "id": "b3e8249b-02f1-4e64-a0f8-23c5f22d9c9f",
    "name": "Frango",
    "slug": "frango",
    "description": "Peito de frango sem osso",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 1,
    "price": 18.5
  },
  {
    "id": "68bd97e3-4796-49d7-926b-6e67c1b3a7d8",
    "name": "Arroz",
    "slug": "arroz",
    "description": "Arroz branco tipo 1",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 5,
    "price": 22.0
  },
  {
    "id": "63c59343-9276-4e5d-a4bc-0037603f2165",
    "name": "Feijão",
    "slug": "feijao",
    "description": "Feijão carioca",
    "measureUnitClass": "MASS",
    "measureUnit": "KILOGRAM",
    "measureUnitQuantity": 1,
    "price": 7.5
  },
  {
    "id": "ad9f4209-96b6-4b5d-b292-f3f690a6c78d",
    "name": "Molho de Tomate",
    "slug": "molho-de-tomate",
    "description": "Molho de tomate tradicional",
    "measureUnitClass": "VOLUME",
    "measureUnit": "MILLILITER",
    "measureUnitQuantity": 340,
    "price": 4.0
  },
  {
    "id": "f3c82919-8279-4c69-8a63-d1c5deac9df2",
    "name": "Creme de Leite",
    "slug": "creme-de-leite",
    "description": "Creme de leite de caixinha",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 3.8
  },
  {
    "id": "1f7150ea-5ec4-4ff0-8e82-9e511d26f1e3",
    "name": "Cenoura",
    "slug": "cenoura",
    "description": "Cenoura fresca",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 5,
    "price": 4.0
  },
  {
    "id": "b19d7066-f9db-45c7-b801-bc2ae69d4b4c",
    "name": "Batata",
    "slug": "batata",
    "description": "Batata inglesa média",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 6,
    "price": 5.0
  },
  {
    "id": "83cbff74-d3b0-4dff-bb56-06f4c91d5943",
    "name": "Pimenta-do-reino",
    "slug": "pimenta-do-reino",
    "description": "Pimenta-do-reino moída",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 50,
    "price": 2.5
  },
  {
    "id": "7f926210-bc72-4182-8fb2-b09ebc860c7b",
    "name": "Orégano",
    "slug": "oregano",
    "description": "Orégano seco",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 30,
    "price": 2.0
  },
  {
    "id": "3b6f07b2-b9df-4a78-8a04-98bc441ac9b7",
    "name": "Manjericão",
    "slug": "manjericao",
    "description": "Folhas frescas de manjericão",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 10,
    "price": 3.5
  },
  {
    "id": "84c9f5de-326c-41b3-b14b-315f20cba508",
    "name": "Coentro",
    "slug": "coentro",
    "description": "Maço de coentro fresco",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 1,
    "price": 2.0
  },
  {
    "id": "73d06697-2ba7-4b08-a828-057de0834737",
    "name": "Salsinha",
    "slug": "salsinha",
    "description": "Maço de salsinha fresca",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 1,
    "price": 2.0
  },
  {
    "id": "36c162d3-7028-40e5-b107-7329c12a9846",
    "name": "Cebolinha",
    "slug": "cebolinha",
    "description": "Maço de cebolinha fresca",
    "measureUnitClass": "QUANTITY",
    "measureUnit": "UNIT",
    "measureUnitQuantity": 1,
    "price": 2.0
  },
  {
    "id": "e1e74c02-5802-467f-9d1f-87e1d92ae4d5",
    "name": "Gengibre",
    "slug": "gengibre",
    "description": "Raiz de gengibre fresco",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 4.0
  },
  {
    "id": "b39cd37e-8f31-4f62-b7e4-ff0ef437687b",
    "name": "Canela em pó",
    "slug": "canela-em-po",
    "description": "Canela em pó para receitas doces",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 50,
    "price": 3.0
  },
  {
    "id": "9a31a1b2-d197-4cfb-8d88-b3a1a0e7c5d1",
    "name": "Cravo-da-Índia",
    "slug": "cravo-da-india",
    "description": "Cravo-da-Índia inteiro",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 30,
    "price": 2.5
  },
  {
    "id": "4d4f12a4-9b67-452f-b501-b879b8ec4810",
    "name": "Noz-moscada",
    "slug": "noz-moscada",
    "description": "Noz-moscada ralada",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 30,
    "price": 3.5
  },
  {
    "id": "a465c8ed-4e0f-40ea-9001-71ecae10f983",
    "name": "Mel",
    "slug": "mel",
    "description": "Mel de abelha puro",
    "measureUnitClass": "VOLUME",
    "measureUnit": "MILLILITER",
    "measureUnitQuantity": 500,
    "price": 15.0
  },
  {
    "id": "024b7d8f-7d56-4048-91a0-dc1c9baf3e62",
    "name": "Vinagre de maçã",
    "slug": "vinagre-de-maca",
    "description": "Vinagre de maçã orgânico",
    "measureUnitClass": "VOLUME",
    "measureUnit": "LITER",
    "measureUnitQuantity": 1,
    "price": 8.0
  },
  {
    "id": "eb93e350-b542-4180-bb51-98a090fd7d35",
    "name": "Mostarda",
    "slug": "mostarda",
    "description": "Mostarda amarela",
    "measureUnitClass": "VOLUME",
    "measureUnit": "MILLILITER",
    "measureUnitQuantity": 200,
    "price": 5.0
  },
  {
    "id": "6e850d2c-f4f7-4f3c-a4b0-7a6827c7e56e",
    "name": "Maionese",
    "slug": "maionese",
    "description": "Maionese tradicional",
    "measureUnitClass": "VOLUME",
    "measureUnit": "MILLILITER",
    "measureUnitQuantity": 500,
    "price": 6.0
  },
  {
    "id": "c5f7460b-35be-4d5e-90c3-29908c6a79a5",
    "name": "Chocolate em pó",
    "slug": "chocolate-em-po",
    "description": "Chocolate em pó 50% cacau",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 7.0
  },
  {
    "id": "f5676db7-0f79-4566-98a3-e0e0a10c8f67",
    "name": "Coco ralado",
    "slug": "coco-ralado",
    "description": "Coco seco ralado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 100,
    "price": 3.5
  },
  {
    "id": "3e498cb0-ffb8-4684-a760-999d9065d8ac",
    "name": "Leite em pó",
    "slug": "leite-em-po",
    "description": "Leite integral em pó",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 400,
    "price": 15.0
  },
  {
    "id": "38a8a66b-df51-4fe1-9447-6b5d57c55b10",
    "name": "Azeite de oliva",
    "slug": "azeite-de-oliva",
    "description": "Azeite de oliva extra virgem",
    "measureUnitClass": "VOLUME",
    "measureUnit": "MILLILITER",
    "measureUnitQuantity": 500,
    "price": 20.0
  },
  {
    "id": "88e90b8e-b3fd-4575-bd6e-c557b15f634f",
    "name": "Castanha-do-pará",
    "slug": "castanha-do-para",
    "description": "Castanha-do-pará sem casca",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 18.0
  },
  {
    "id": "7f017510-e9f7-4c06-94f7-253846a30cd1",
    "name": "Amêndoas",
    "slug": "amendoas",
    "description": "Amêndoas sem casca",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 15.0
  },
  {
    "id": "961c6996-53fa-4b71-858b-720ac8752870",
    "name": "Aveia em flocos",
    "slug": "aveia-em-flocos",
    "description": "Aveia em flocos finos",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 6.0
  },
  {
    "id": "c4b38039-f00c-4717-91b5-9fe6d12b8b1d",
    "name": "Lentilha",
    "slug": "lentilha",
    "description": "Lentilha seca",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 8.0
  },
  {
    "id": "a01bc9e9-3a0d-4e53-b8c3-cfbf32cc5fc0",
    "name": "Grão-de-bico",
    "slug": "grao-de-bico",
    "description": "Grão-de-bico seco",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 9.0
  },
  {
    "id": "7c02a02d-bf96-4778-b90c-d74e9f0201f5",
    "name": "Ervilha",
    "slug": "ervilha",
    "description": "Ervilha seca",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 7.0
  },
  {
    "id": "429f8a16-4fa6-4c9d-bc0a-61d9bdf419cd",
    "name": "Castanha de caju",
    "slug": "castanha-de-caju",
    "description": "Castanha de caju torrada",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 16.0
  },
  {
    "id": "4e8c6e13-7e2a-48a9-b399-e6009c3b7b8c",
    "name": "Linhaça",
    "slug": "linhaca",
    "description": "Semente de linhaça dourada",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 250,
    "price": 5.0
  },
  {
    "id": "44e16a2e-1f8a-41e7-82b3-8186e8c244a3",
    "name": "Chia",
    "slug": "chia",
    "description": "Semente de chia",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 250,
    "price": 6.0
  },
  {
    "id": "19a225e7-e4e9-4f82-9a72-0e3270c1c7b2",
    "name": "Gergelim",
    "slug": "gergelim",
    "description": "Semente de gergelim branco",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 200,
    "price": 4.0
  },
  {
    "id": "fe8e602f-270a-428d-b801-96fd982a2bdf",
    "name": "Amido de milho",
    "slug": "amido-de-milho",
    "description": "Amido de milho para engrossar molhos e caldos",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 5.5
  },
  {
    "id": "0933b4cc-bdb5-4025-ba52-bad298af6dd8",
    "name": "Polvilho Doce",
    "slug": "polvilho-doce",
    "description": "Polvilho doce",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 300,
    "price": 8.0
  },
  {
    "id": "815b059c-a796-4314-8e99-e7b997a585df",
    "name": "Água Filtrada",
    "slug": "agua-filtrada",
    "description": "Água filtrada",
    "measureUnitClass": "VOLUME",
    "measureUnit": "LITER",
    "measureUnitQuantity": 20,
    "price": 11.99
  },
  {
    "id": "ebdbb7da-1aad-45cc-bd77-dbec2addb745",
    "name": "Queijo Parmesão Ralado",
    "slug": "queijo-parmesao-ralado",
    "description": "Queijo parmesão ralado",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 500,
    "price": 23.99
  },
  {
    "id": "2339c7a3-9d6f-4c88-8b46-a0bda9777d8f",
    "name": "Massa para Lasanha",
    "slug": "massa-para-lasanha",
    "description": "Massa para lasanha tradicional",
    "measureUnitClass": "MASS",
    "measureUnit": "GRAM",
    "measureUnitQuantity": 700,
    "price": 27.99
  }
]

const products = [
  {
    id: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    name: "Bolo de Cenoura com Cobertura de Chocolate",
    slug: "bolo-de-cenoura-com-cobertura-de-chocolate",
    description: "Bolo de cenoura fofinho com cobertura de chocolate cremosa",
    preparationTime: 60,
    yield: 12,
    annotation: "Receita tradicional de bolo de cenoura com cobertura de chocolate",
    recipe: "Massa\n1. Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.\n2. Acrescente o açúcar e bata novamente por 5 minutos.\n3. Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.\n4. Acrescente o fermento e misture lentamente com uma colher.\n5. Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.\n\n\n Cobertura\n1. Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture.\n2. Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo.\n3. Sirva em seguida.",
    profitMargin: 25,
    sellingPrice: 20.99
  },
  {
    id: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    name: "Pão de Queijo",
    slug: "pao-de-queijo",
    description: "Pão de queijo mineiro quentinho",
    preparationTime: 50,
    yield: 30,
    annotation: "Receita tradicional de pão de queijo mineiro",
    recipe: "1. Ferva o leite com a água e o óleo. \n2. Em uma vasilha misture o polvilho e o sal. \n3. Jogue o liquido fervido e misture com uma colher grande. \n4. Espere esfriar e despeje o queijo ralado e os ovos. \n5. Misture a massa com a mão amassando bem até virar uma cola caseira dura. \n6. Faça bolinhas e coloque em uma forma untada. \n7. Leve ao forno pré-aquecido a 180 graus por 30 minutos.",
    profitMargin: 30,
    sellingPrice: 47.99
  },
  {
    id: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    name: "Lasanha Bolonhesa",
    slug: "lasanha-bolonhesa",
    description: "Lasanha de carne moída com molho de tomate e queijo",
    preparationTime: 110,
    yield: 8,
    annotation: "Receita tradicional de lasanha bolonhesa",
    profitMargin: 35,
    sellingPrice: 119.99,
    recipe: "Lasanha\n1. Cozinhe a massa da lasanha em água fervente por 10 minutos.\n2. Em uma panela, refogue a carne moída com a cebola e o alho.\n3. Adicione o molho de tomate e deixe cozinhar por 5 minutos.\n4. Em um refratário, alterne camadas de massa, molho e queijo.\n5. Finalize com uma camada de queijo e leve ao forno por 20 minutos.\n\n\n Molho Bechamel\n1. Em uma panela, derreta a manteiga e adicione a farinha de trigo.\n2. Misture bem e adicione o leite aos poucos, mexendo sempre.\n3. Tempere com sal, pimenta-do-reino e noz-moscada.\n4. Cozinhe por 5 minutos até engrossar.\n5. Utilize o molho para fazer a lasanha."
  }
]

const ingredientOnProduct = [
  // Bolo de Cenoura com Cobertura de Chocolate
  {
    // oleo-de-soja
    ingredientId: "5c67e8da-3943-4f11-b36d-c45b6c9e1a5f",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.2,
    measureUnit: "LITER",
  },
  {
    // ovos
    ingredientId: "d6b9c0b7-3c8f-4f96-91e0-282e8c3b6e10",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 4,
    measureUnit: "UNIT",
  },
  {
    // farinha-de-trigo
    ingredientId: "20c49bfa-1ecb-4f58-b0a3-3e721dcd8371",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.4,
    measureUnit: "KILOGRAM",
  },
  {
    // cenoura
    ingredientId: "1f7150ea-5ec4-4ff0-8e82-9e511d26f1e3",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 3,
    measureUnit: "UNIT",
  },
  {
    // acucar
    ingredientId: "9286d272-fc39-4c57-89e5-4a50fd3d2b97",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.400,
    measureUnit: "KILOGRAM",
  },
  {
    // fermento-em-po
    ingredientId: "c9b62f94-84a0-41e1-9e8a-3d70589f4a5d",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.01,
    measureUnit: "KILOGRAM",
  },
  {
    // manteiga
    ingredientId: "f26a09f3-6583-4fc6-bbcb-56a1c4eacbaf",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.01,
    measureUnit: "KILOGRAM",
  },
  {
    // chocolate-em-po
    ingredientId: "c5f7460b-35be-4d5e-90c3-29908c6a79a5",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.03,
    measureUnit: "KILOGRAM",
  },
  {
    // leite
    ingredientId: "7a5d4a89-1b43-4a91-8e99-72fdf9c5e4b3",
    productId: "687a2bbe-0360-40ea-a570-04d7da6f287a",
    quantity: 0.2,
    measureUnit: "LITER",
  },
  // Pão de Queijo
  {
    // leite
    ingredientId: "7a5d4a89-1b43-4a91-8e99-72fdf9c5e4b3",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.4,
    measureUnit: "LITER",
  },
  {
    // ovos
    ingredientId: "d6b9c0b7-3c8f-4f96-91e0-282e8c3b6e10",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 3,
    measureUnit: "UNIT",
  },
  {
    // oleo-de-soja
    ingredientId: "5c67e8da-3943-4f11-b36d-c45b6c9e1a5f",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.15,
    measureUnit: "LITER",
  },
  {
    // polvilho-doce
    ingredientId: "0933b4cc-bdb5-4025-ba52-bad298af6dd8",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.5,
    measureUnit: "KILOGRAM",
  },
  {
    // agua-filtrada
    ingredientId: "815b059c-a796-4314-8e99-e7b997a585df",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.2,
    measureUnit: "LITER",
  },
  {
    // sal
    ingredientId: "5738e2d8-3f2d-4de3-86f9-1277dc6e7b4c",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.01,
    measureUnit: "KILOGRAM",
  },
  {
    // queijo-parmesao-ralado
    ingredientId: "ebdbb7da-1aad-45cc-bd77-dbec2addb745",
    productId: "c0c2a8c3-1c5b-4c3f-8e9b-7d5b0b8e9f6d",
    quantity: 0.3,
    measureUnit: "KILOGRAM",
  },
  // Lasanha Bolonhesa
  {
    // massa-para-lasanha
    ingredientId: "2339c7a3-9d6f-4c88-8b46-a0bda9777d8f",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.5,
    measureUnit: "KILOGRAM",
  },
  {
    // creme-de-leite
    ingredientId: "f3c82919-8279-4c69-8a63-d1c5deac9df2",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.4,
    measureUnit: "KILOGRAM",
  },
  {
    // farinha-de-trigo
    ingredientId: "20c49bfa-1ecb-4f58-b0a3-3e721dcd8371",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.045,
    measureUnit: "KILOGRAM",
  },
  {
    // mussarela
    ingredientId: "f304dba5-01e2-48e4-92b8-5fce2dbfd4f7",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.5,
    measureUnit: "KILOGRAM",
  },
  {
    // leite
    ingredientId: "7a5d4a89-1b43-4a91-8e99-72fdf9c5e4b3",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.4,
    measureUnit: "LITER",
  },
  {
    // oleo-de-soja
    ingredientId: "5c67e8da-3943-4f11-b36d-c45b6c9e1a5f",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.015,
    measureUnit: "LITER",
  },
  {
    // alho
    ingredientId: "c3e19d6a-09ff-4bc7-b0f9-f4ddc9a5e375",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.3,
    measureUnit: "UNIT",
  },
  {
    // carne-moida
    ingredientId: "a5d21d91-4b14-4fa4-92fd-81d7ea1e8aa8",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.5,
    measureUnit: "KILOGRAM",
  },
  {
    // manteiga
    ingredientId: "f26a09f3-6583-4fc6-bbcb-56a1c4eacbaf",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.015,
    measureUnit: "KILOGRAM",
  },
  {
    // presunto
    ingredientId: "d2825977-36c1-4415-b74c-63c4b84603fc",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.5,
    measureUnit: "KILOGRAM",
  },
  {
    // sal
    ingredientId: "5738e2d8-3f2d-4de3-86f9-1277dc6e7b4c",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.01,
    measureUnit: "KILOGRAM",
  },
  {
    // cebola
    ingredientId: "b6a03f92-c814-46eb-b940-8b61d9f1c9af",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 1,
    measureUnit: "UNIT",
  },
  {
    // molho-de-tomate
    ingredientId: "ad9f4209-96b6-4b5d-b292-f3f690a6c78d",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.34,
    measureUnit: "LITER",
  },
  {
    // queijo-parmesao-ralado
    ingredientId: "ebdbb7da-1aad-45cc-bd77-dbec2addb745",
    productId: "7bcca0b5-d497-45c2-b86b-002f7d990abe",
    quantity: 0.05,
    measureUnit: "KILOGRAM",
  }
]

const constants = [
  { key: "pickUpTax", value: "0" },
  { key: "privateDeliveryTax", value: "3,5" },
  { key: "iFoodDeliveryTax", value: "7.2" },
]

async function seed() {
  await prismaClient.constant.createMany({ data: constants })
  console.log("Constants seeded")
  await prismaClient.ingredient.createMany({ data: ingredients })
  console.log("Ingredients seeded")
  await prismaClient.product.createMany({ data: products })
  console.log("Products seeded")
  await prismaClient.ingredientOnProduct.createMany({ data: ingredientOnProduct })
  console.log("Ingredients on Product seeded")
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