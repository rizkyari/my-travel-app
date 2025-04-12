export interface User {
    id: number
    username: string
    email: string
    documentId: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    provider: string
    locale: string | null
}