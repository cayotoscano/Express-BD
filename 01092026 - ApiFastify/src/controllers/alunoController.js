import alunoRepository from '../repositories/alunoRepository.js'

class AlunoController {

    async index(request, reply) {
        const alunos = await alunoRepository.findAll()

        return alunos
    }

    async show(request, reply) {
        const { id } = request.params

        const aluno = await alunoRepository.findById(id)

        if (!aluno) {
            return reply.code(404).send({
                message: 'Aluno não encontrado'
            })
        }

        return aluno
    }

    async store(request, reply) {
        const { nome, curso } = request.body

        const aluno = await alunoRepository.create({
            nome,
            curso
        })

        return reply.code(201).send(aluno)
    }

    async update(request, reply) {
        const { id } = request.params
        const { nome, curso } = request.body

        const aluno = await alunoRepository.update(id, {
            nome,
            curso
        })

        if (!aluno) {
            return reply.code(404).send({
                message: 'Aluno não encontrado'
            })
        }

        return aluno
    }

    async delete(request, reply) {
        const { id } = request.params

        const deleted = await alunoRepository.delete(id)

        if (!deleted) {
            return reply.code(404).send({
                message: 'Aluno não encontrado'
            })
        }

        return reply.code(204).send()
    }
}

export default new AlunoController()