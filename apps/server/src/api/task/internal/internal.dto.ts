import { createZodDto, patchNestJsSwagger } from "nestjs-zod";
import { z } from "zod";

export class TaskArgs extends createZodDto(
    z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        categoryId: z.string().optional(),
        dueDate: z.coerce.date().optional(),
        status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    }),
) { }

patchNestJsSwagger()