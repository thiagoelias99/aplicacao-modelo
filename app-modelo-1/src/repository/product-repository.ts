import { ICreateProduct, IProduct, IUpdateProduct } from "@/models/product"

export interface IProductRepository {
  createProduct(data: ICreateProduct, id: string): Promise<IProduct>
  getAllProducts(): Promise<IProduct[]>
  getProductBySlug(slug: string): Promise<IProduct | null>
  updateProduct(data: IUpdateProduct): Promise<IProduct>
}