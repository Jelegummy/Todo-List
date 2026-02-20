import { createZodDto, patchNestJsSwagger } from 'nestjs-zod'
import { z } from 'zod'

export class CategoryArgs extends createZodDto(
  z.object({
    name: z.string().min(1),
    color: z.string().min(1).optional(),
  }),
) {}

patchNestJsSwagger()
