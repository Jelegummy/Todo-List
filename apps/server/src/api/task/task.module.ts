import { Module } from "@nestjs/common";
import { TaskInternalController } from "./internal/internal.controller";
import { TaskInternalService } from "./internal/internal.service";

@Module({
    controllers: [TaskInternalController],
    providers: [TaskInternalService],
})
export class TaskModule { }