import { ENDPOINT, fetchers, HttpStatus } from "@/utils";
import { CreateTask, Task } from "./types";
import { getSession } from "next-auth/react";

export const createTask = async (args: CreateTask) => {
    const session = await getSession()

    const res = await fetchers.Post(`${ENDPOINT}/task/internal/create`, {
        data: args,
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const updateTask = async (args: CreateTask, id: string) => {
    const session = await getSession()

    const res = await fetchers.Patch(`${ENDPOINT}/task/internal/update/${id}`, {
        data: args,
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const getTasks = async () => {
    const session = await getSession()

    const res = await fetchers.Get<Task[]>(`${ENDPOINT}/task/internal/tasks`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const getTaskById = async (id: string) => {
    const session = await getSession()

    const res = await fetchers.Get<Task>(`${ENDPOINT}/task/internal/tasks/${id}`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const deleteTask = async (id: string) => {
    const session = await getSession()

    const res = await fetchers.Delete(`${ENDPOINT}/task/internal/delete/${id}`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}