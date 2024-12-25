export interface UsageRecord {
  id: number
  date: string
  computerSlot: number
  initialDuration: number
  additionalTime: number
  totalPrice: number
}

export interface ComputerSlot {
  id: number
  status: 'available' | 'in-use'
  startTime?: string
  package?: string
  initialDuration?: number
  additionalTime?: number
  price?: number
  remainingTime?: number
}

