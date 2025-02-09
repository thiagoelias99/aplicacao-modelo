import { DataTable } from "../ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { IProduct } from "@/models/product"

interface Props {
  data: IProduct[]
}

export default function IngredientsTable({ data }: Props) {
  function getColumns(): ColumnDef<IProduct>[] {
    return [
      {
        accessorKey: "name",
        header: "Nome",
      }
    ]
  }

  return (
    <DataTable
      columns={getColumns()}
      data={data}
    />
  )
}

