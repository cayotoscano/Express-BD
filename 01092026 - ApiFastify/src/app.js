import Fastify from 'fastify'
import pool from './database/connection.js'
import alunoRoutes from './routes/alunoRoutes.js'

const app = Fastify({
    logger: true
})

app.register(alunoRoutes, {
    prefix: '/api/alunos'
})

app.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    if (error.validation) {
        return reply.code(404).send({
            message: 'Dados inválidos',
            errors: error.validation
        })
    }

    return reply.code(500).send({
        message: 'Erro interno do servidor'
    })
})

app.addHook('onClose', async () => {
    await pool.end()
})

export default app