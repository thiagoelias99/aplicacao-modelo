import { ICreateProduct, IProduct } from "@/models/product"

export interface IProductRepository {
  createProduct(data: ICreateProduct, id: string): Promise<IProduct>
  getAllProducts(): Promise<IProduct[]>
  getProductBySlug(slug: string): Promise<IProduct | null>
}