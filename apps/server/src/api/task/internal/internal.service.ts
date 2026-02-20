import { PrismaService } from "@app/db";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskArgs } from "./internal.dto";
import { Context, getUserFromContext } from "@app/common";

@Injectable()
export class TaskInternalService {
    constructor(private readonly db: PrismaService) { }

    async createTask(args: TaskArgs, ctx: Context) {
        const user = getUserFromContext(ctx)
        if (!user) {
            throw new Error('User not found')
        }

        if (args.categoryId) {
            const category = await this.db.category.findUnique({
                where: {
                    id: args.categoryId,
                },
            })

            if (!category) {
                throw new NotFoundException('Category not found')
            }
        }

        const job = await this.db.task.create({
            data: {
                title: args.title,
                description: args.description,
                dueDate: args.dueDate,
                ownerId: user.id,
                status: args.status,
                priority: args.priority,
                categoryId: args.categoryId,
            },
        })

        return job
    }

    async updateTask(args: TaskArgs, ctx: Context, id: string) {
        const user = getUserFromContext(ctx)
        if (!user) {
            throw new Error('User not found')
        }

        if (args.categoryId) {
            const category = await this.db.category.findUnique({
                where: {
                    id: args.categoryId,
                },
            })

            if (!category) {
                throw new NotFoundException('Category not found')
            }
        }

        const job = await this.db.task.update({
            where: {
                id,
            },
            data: {
                title: args.title,
                description: args.description,
                dueDate: args.dueDate,
                ownerId: user.id,
                status: args.status,
                priority: args.priority,
                categoryId: args.categoryId,
            },
        })

        return job
    }

    async getTasks(ctx: Context) {
        const user = getUserFromContext(ctx)
        if (!user) {
            throw new Error('User not found')
        }

        const tasks = await this.db.task.findMany({
            where: {
                ownerId: user.id,
            },
        })

        return tasks
    }

    async getTaskById(id: string, ctx: Context) {
        const user = getUserFromContext(ctx)
        if (!user) {
            throw new Error('User not found')
        }

        const task = await this.db.task.findFirst({
            where: {
                id,
                ownerId: user.id,
            },
        })

        return task
    }

    async deleteTask(id: string, ctx: Context) {
        const user = getUserFromContext(ctx)
        if (!user) {
            throw new Error('User not found')
        }

        const task = await this.db.task.findUnique({
            where: {
                id,
                ownerId: user.id,
            },
        })

        if (!task) {
            throw new NotFoundException('Task not found')
        }

        await this.db.task.delete({
            where: {
                id,
            },
        })

    }
}