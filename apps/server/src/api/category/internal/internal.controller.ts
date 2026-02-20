import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CategoryInternalService } from './internal.service'
import { CategoryArgs } from './internal.dto'
import { Context } from '@app/common'

@ApiTags('Category - Internal')
@Controller('category/internal')
export class CategoryInternalController {
  constructor(private readonly service: CategoryInternalService) {}

  @Post('/create')
  async createCategory(@Body() args: CategoryArgs, @Req() ctx: Context) {
    const res = await this.service.createCategory(args, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Patch('/update/:id')
  async updateCategory(
    @Body() args: CategoryArgs,
    @Req() ctx: Context,
    @Param('id') id: string,
  ) {
    const res = await this.service.updateCategory(args, ctx, id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/categories')
  async getCategories(@Req() ctx: Context) {
    const res = await this.service.getCategories(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/categories/:id')
  async getCategoryById(@Req() ctx: Context, @Param('id') id: string) {
    const res = await this.service.getCategoryById(id, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Delete('/delete/:id')
  async deleteCategory(@Req() ctx: Context, @Param('id') id: string) {
    const res = await this.service.deleteCategory(id, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
