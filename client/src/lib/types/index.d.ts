export interface Activity {
    id: string
    title: string
    date: Date
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number
}

export interface CreateActivity {
    title: string
    date: Date
    description: string
    category: string
    city: string
    venue: string
}