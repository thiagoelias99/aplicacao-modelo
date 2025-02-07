"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { ComponentProps } from "react"
import { EMeasureUnitMapper, IIngredient } from "@/models/ingredient"
import { Card, CardContent } from "../ui/card"
import { cn, formatCurrency } from "@/lib/utils"

function getColumns(): ColumnDef<IIngredient>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "measureUnitQuantity",
      header: "Quantidade",
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
      accessorKey: "id",
      header: () => <p className="text-center">ID</p>,
    },
  ]
}

interface Props extends ComponentProps<'div'> {
  data: IIngredient[]
}

export default function IngredientsTable({ data, className, ...rest }: Props) {
  return (
    <Card className={cn("", className)}
      {...rest}
    >
      <CardContent>
        <DataTable
          columns={getColumns()}
          data={data}
        />
      </CardContent>
    </Card>
  )
}
