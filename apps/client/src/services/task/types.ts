export type CreateTask = {
    id: string
    title: string
    description?: string
    completed: boolean
    dueDate?: Date | null
    createdAt: Date
    updatedAt: Date
}

export type Task = {
    id: string
    title: string
    description?: string
    completed: boolean
    dueDate?: Date | null
    createdAt: Date
    updatedAt: Date
}