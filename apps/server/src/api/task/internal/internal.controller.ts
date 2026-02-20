import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TaskInternalService } from "./internal.service";
import { TagUserToTaskArgs, TaskArgs, TaskStatus } from "./internal.dto";
import { Context } from "@app/common";

@ApiTags('Task - Internal')
@Controller('task/internal')
export class TaskInternalController {
    constructor(private readonly service: TaskInternalService) { }

    @Post('/create')
    async createTask(@Body() args: TaskArgs, @Req() ctx: Context) {
        const res = await this.service.createTask(args, ctx)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Patch('/update/:id')
    async updateTask(@Body() args: TaskArgs, @Req() ctx: Context, @Param('id') id: string) {
        const res = await this.service.updateTask(args, ctx, id)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Get('/tasks')
    async getTasks(@Req() ctx: Context) {
        const res = await this.service.getTasks(ctx)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Get('/tasks/:id')
    async getTaskById(@Req() ctx: Context, @Param('id') id: string) {
        const res = await this.service.getTaskById(id, ctx)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Delete('/delete/:id')
    async deleteTask(@Req() ctx: Context, @Param('id') id: string) {
        const res = await this.service.deleteTask(id, ctx)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Patch('/update-status/:id')
    async updateTaskStatus(@Body('status') status: TaskStatus, @Req() ctx: Context, @Param('id') id: string) {
        const res = await this.service.updateTaskStatus(status, ctx, id)

        return { statusCode: HttpStatus.OK, data: res }
    }

    @Post('/tasks/tag-user')
    async tagUserToTask(@Body() args: TagUserToTaskArgs, @Req() ctx: Context) {
        const res = await this.service.tagUserToTask(args.userId, args.taskId, ctx);

        return { statusCode: HttpStatus.OK, data: res };
    }

    @Get('/tasks/tagged')
    async getTaggedTasks(@Req() ctx: Context) {
        const res = await this.service.getTaggedTasks(ctx);

        return { statusCode: HttpStatus.OK, data: res };
    }
}