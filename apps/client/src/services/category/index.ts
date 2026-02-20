import { getSession } from "next-auth/react";
import { Category, CreateCategoryArgs } from "./types";
import { ENDPOINT, fetchers, HttpStatus } from "@/utils";


export const createCategory = async (args: CreateCategoryArgs) => {
    const session = await getSession()

    const res = await fetchers.Post(`${ENDPOINT}/category/internal/create`, {
        data: args,
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const updateCategory = async (args: CreateCategoryArgs, id: string) => {
    const session = await getSession()

    const res = await fetchers.Patch(`${ENDPOINT}/category/internal/update/${id}`, {
        data: args,
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const getCategories = async () => {
    const session = await getSession()

    const res = await fetchers.Get<Category[]>(`${ENDPOINT}/category/internal/categories`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const getCategoryById = async (id: string) => {
    const session = await getSession()

    const res = await fetchers.Get<Category>(`${ENDPOINT}/category/internal/categories/${id}`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}

export const deleteCategory = async (id: string) => {
    const session = await getSession()

    const res = await fetchers.Delete(`${ENDPOINT}/category/internal/delete/${id}`, {
        token: session?.user.accessToken,
    })

    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data
}