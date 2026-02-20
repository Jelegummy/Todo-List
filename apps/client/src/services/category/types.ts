export type CreateCategoryArgs = {
    name: string
    color?: string
}

export type Category = {
    id: string
    name: string
    color?: string
    createdAt: Date
    updatedAt: Date
}