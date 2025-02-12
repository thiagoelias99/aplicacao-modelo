"use client"

import { DataTable } from "../ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { IProduct, Product } from "@/models/product"
import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import { Button, buttonVariants } from "../ui/button"
import { ArrowUpDown, Edit2Icon, EyeIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  data: IProduct[]
}

export default function ProductsTable({ data }: Props) {
  const [tableData, setTableData] = useState<Product[]>([])

  useEffect(() => {
    const products = data.map((product) => new Product(product))
    console.log(products)
    setTableData(products)
  }, [data])

  return (
    <DataTable
      columns={getColumns()}
      data={tableData}
      enablePagination
      filtering={{
        enableFiltering: true,
        field: "name",
        placeholder: "Pesquisar por nome"
      }}
    />
  )

  function getColumns(): ColumnDef<Product>[] {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
      {
        accessorKey: "sellingPrice",
        header: () => <p className="text-center">Preço</p>,
        cell: (row) => <p className="text-center">{formatCurrency(Number(row.getValue()))}</p>,
      },
      {
        accessorKey: "preparationTime",
        header: () => <p className="text-center">Tempo de preparo</p>,
        cell: (row) => <p className="text-center">{row.getValue() as string} mins</p>
      },
      {
        accessorKey: "yield",
        header: () => <p className="text-center">Rendimento</p>,
        cell: (row) => <p className="text-center">{row.getValue() as string} porções</p>
      },
      {
        id: "actions",
        header: () => <p className="text-center">Ações</p>,
        cell: (row) => {
          const product = row.row.original

          return (
            <div className="flex justify-center items-center gap-1">
              <Link
                href={`/app/produtos/${product.slug}`}
                className={buttonVariants({ variant: "secondary", size: "icon" })}
              ><EyeIcon />
              </Link>
              <Link
                href={`/app/produtos/editor/${product.slug}`}
                className={buttonVariants({ variant: "secondary", size: "icon" })}
              ><Edit2Icon /></Link>
            </div>
          )
        }
      }
    ]
  }
}