import alunoController from '../controllers/alunoController.js'
import { alunoBodySchema, alunoParamsSchema } from '../schemas/alunoSchemas.js'

async function alunoRoutes(fastify) {
  fastify.get('/', alunoController.index)

  fastify.get('/:id',
    {
      schema: {
        params: alunoParamsSchema
      }
    },
    alunoController.show
  )

  fastify.post('/',
    {
      schema: {
        body: alunoBodySchema
      }
    },
    alunoController.store
  )

  fastify.put('/:id',
    {
      schema: {
        params: alunoParamsSchema,
        body: alunoBodySchema
      }
    },
    alunoController.update
  )

  fastify.delete('/:id',
    {
      schema: {
        params: alunoParamsSchema
      }
    },
    alunoController.delete
  )

}

export default alunoRoutes