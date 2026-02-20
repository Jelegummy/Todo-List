import { Module } from "@nestjs/common";
import { CategoryInternalService } from "./internal/internal.service";
import { CategoryInternalController } from "./internal/internal.controller";

@Module({
    controllers: [CategoryInternalController],
    providers: [CategoryInternalService],
})
export class CategoryModule { }