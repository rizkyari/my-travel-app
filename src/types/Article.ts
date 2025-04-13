export interface Comment {
    id: number
    documentId: string
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string | null
}
  
export interface User {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string | null
}
  
export interface Article {
    id: number
    documentId: string
    title: string
    description: string
    cover_image_url: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string | null
    user: User
    category: string | null
    comments: Comment[]
    localizations?: any[]
}

export interface ArticleForm {
    title: string
    description: string
    cover_image_url: string
    category: number
}