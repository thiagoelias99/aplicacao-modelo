import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number = 0) {
  return `R$ ${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)}`
}

interface FormatPercentageOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  appendSignage?: boolean
}

export function formatPercentage(value: number = 0, options?: FormatPercentageOptions) {
  const signage = options?.appendSignage ? (value < 0 ? "" : "+") : ""

  return `${signage}${Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: options?.minimumFractionDigits || 2,
    maximumFractionDigits: options?.maximumFractionDigits || 2
  }).format(value)}`
}
