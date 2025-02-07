"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { EMeasureUnitMapper, IIngredient, Ingredient } from "@/models/ingredient"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { Edit2Icon } from "lucide-react"

function getColumns(): ColumnDef<Ingredient>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "measureUnitQuantity",
      header: () => <p className="text-center">Quantidade</p>,
      cell: (row) => <p className="text-center">{row.getValue() as string}</p>
    },
    {
      accessorKey: "measureUnit",
      header: () => <p className="text-center">Unidade</p>,
      cell: (row) => <p className="text-center">{EMeasureUnitMapper[row.getValue() as EMeasureUnit].unit}</p>,
    },
    {
      accessorKey: "price",
      header: () => <p className="text-center">Preço</p>,
      cell: (row) => <p className="text-center">{formatCurrency(Number(row.getValue()))}</p>,
    },
    {
      accessorKey: "formattedPricePerUnit",
      header: () => <p className="text-center">Preço de Referência</p>,
      cell: (row) => <p className="text-center">{row.getValue() as string}</p>,
    },
    {
      accessorKey: "slug",
      header: () => <p className="text-center">Ações</p>,
      cell: (row) => <p className="text-center">
        <Link href={`/app/ingredientes/${row.getValue()}`}>
          <Button variant="secondary" size="icon"><Edit2Icon /></Button>
        </Link>
      </p>,
    },
  ]
}

interface Props {
  data: IIngredient[]
}

export default function IngredientsTable({ data }: Props) {
  const ingredients = data.map((ingredient) => new Ingredient(ingredient))

  return (
    <DataTable
      columns={getColumns()}
      data={ingredients}
    />
  )
}
