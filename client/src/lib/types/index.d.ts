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
    attendees: Profile[]
    isGoing: boolean
    isHost: boolean
    hostId: string
    hostDisplayName: string
}

type Profile = {
    id: string
    displayName: string
    bio?: string
    imageUrl?: string
}

export interface CreateActivity {
    title: string
    date: Date
    description: string
    category: string
    city: string
    venue: string
}

type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type Todo = {
    id: number;
    title: string;
}