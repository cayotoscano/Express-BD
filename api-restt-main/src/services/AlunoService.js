class AlunoService {
  validarId(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('O ID deve ser um número inteiro positivo')
    }
  }

  validarDados({ nome, curso }) {
    if (!nome || !nome.trim()) {
      throw new Error('O nome é obrigatório')
    }

    if (!curso || !curso.trim()) {
      throw new Error('O curso é obrigatório')
    }

    if (nome.trim().length < 3) {
      throw new Error('O nome deve possuir pelo menos 3 caracteres')
    }

    if (curso.trim().length < 2) {
      throw new Error('O curso deve possuir pelo menos 2 caracteres')
    }
  }
}

export default new AlunoService()
