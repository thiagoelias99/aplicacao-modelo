import { IIngredient } from "@/models/ingredient"

export interface IIngredientRepository {
  saveIngredient(data: Partial<IIngredient>): Promise<IIngredient>
  getAllIngredients(): Promise<IIngredient[]>
  getIngredientBySlug(slug: string): Promise<IIngredient | null>
}