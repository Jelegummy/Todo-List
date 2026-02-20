import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'
import { CategoryArgs } from './internal.dto'
import { Context, getUserFromContext } from '@app/common'

@Injectable()
export class CategoryInternalService {
  constructor(private readonly db: PrismaService) {}

  async createCategory(args: CategoryArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    if (!user) {
      throw new Error('User not found')
    }

    const categoryTask = await this.db.category.create({
      data: {
        name: args.name,
        color: args.color,
        userId: user.id,
      },
    })

    return categoryTask
  }

  async updateCategory(args: CategoryArgs, ctx: Context, id: string) {
    const user = getUserFromContext(ctx)
    if (!user) {
      throw new Error('User not found')
    }

    const categoryTask = await this.db.category.update({
      where: {
        id,
      },
      data: {
        name: args.name,
        color: args.color,
        userId: user.id,
      },
    })

    return categoryTask
  }

  async getCategories(ctx: Context) {
    const user = getUserFromContext(ctx)
    if (!user) {
      throw new Error('User not found')
    }

    const categories = await this.db.category.findMany({
      where: {
        userId: user.id,
      },
    })

    return categories
  }

  async getCategoryById(id: string, ctx: Context) {
    const user = getUserFromContext(ctx)
    if (!user) {
      throw new Error('User not found')
    }

    const category = await this.db.category.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    return category
  }

  async deleteCategory(id: string, ctx: Context) {
    const user = getUserFromContext(ctx)
    if (!user) {
      throw new Error('User not found')
    }

    await this.db.category.delete({
      where: {
        id,
        userId: user.id,
      },
    })
  }
}
