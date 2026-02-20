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

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export type TagUserToTaskArgs = {
    email: string
    taskId: string
}