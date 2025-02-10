import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatCurrencyOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  appendSignage?: boolean,
  currency?: string,
  currencySymbol?: string,
  hideCurrency?: boolean
}

export function formatCurrency(value: number = 0, options?: FormatCurrencyOptions) {
  const signage = options?.appendSignage ? (value < 0 ? "-" : "+") : ""
  const currency = options?.currency || "BRL"

  if (options?.hideCurrency) {
    return value.toFixed(2).replace(".", ",")
  }

  return `${signage} ${options?.currencySymbol || "R$"} ${Intl.NumberFormat("pt-BR", {
    currency: currency,
    minimumFractionDigits: options?.minimumFractionDigits || 2,
    maximumFractionDigits: options?.maximumFractionDigits || 2,
    currencyDisplay: "name"
  }).format(value)}`
}

interface FormatPercentageOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  appendSignage?: boolean
  hidePercentage?: boolean
}

export function formatPercentage(value: number = 0, options?: FormatPercentageOptions) {
  const signage = options?.appendSignage ? (value < 0 ? "" : "+") : ""

  if (options?.hidePercentage) {
    return signage + value.toFixed(2).replace(".", ",")
  }

  return `${signage}${Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: options?.minimumFractionDigits || 2,
    maximumFractionDigits: options?.maximumFractionDigits || 2
  }).format(value)}`
}
