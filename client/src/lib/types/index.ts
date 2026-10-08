export type PagedList<T, TCursor> = {
    items: T[],
    nextCursor: TCursor
}

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
    hostImageUrl?: string
}

export type Profile = {
    id: string
    displayName: string
    bio?: string
    imageUrl?: string
    followersCount?: number
    followingCount?: number
    following?: boolean
}

export type Photo = {
    id: string
    url: string
    publicId: string
    userId: string
}

export interface CreateActivity {
    title: string
    date: Date
    description: string
    category: string
    city: string
    venue: string
}

export type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

export type ChatComment = {
    id: string
    createdAt: Date
    body: string
    userId: string
    displayName: string
    imageUrl?: string
}

export type Todo = {
    id: number;
    title: string;
}