export type InsuranceType = 'developer' | 'designer'
export type ProductType = `${InsuranceType}-insurance`

export interface CachedData {
  product?: ProductType
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
}
