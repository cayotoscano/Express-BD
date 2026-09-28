import express from 'express'

const app = express()

app.use(express.json())

const alunos = [
    { id: 1, nome: 'Bruno', curso: 'ADS' },
    { id: 2, nome: 'Maria', curso: 'ADS' },
    { id: 3, nome: 'Lara', curso: 'ADS' },
    { id: 4, nome: 'José', curso: 'ADS' }
]

function buscarAlunoPorId(id) {
    return alunos.filter(aluno => aluno.id == id)
}

function buscarIndexAluno(id) {
    return alunos.findIndex(aluno => aluno.id == id)
}

app.get('/', (req, res) => {
    res.send('Minha API REST com Express')
})

app.get('/alunos', (req, res) => {
    res.status(200).send(alunos);
})

app.post('/alunos', (req, res) => {
    alunos.push(req.body)
    res.status(201).send('Aluno cadastrado com sucesso!')
})

app.delete('/alunos/:id', (req, res) => {
    let index = buscarIndexAluno(req.params.id)
    alunos.splice(index, 1)
    res.send(`Aluno com id ${req.params.id} excluido com sucesso`)
})

app.get('/alunos/:id', (req, res) => {
    let index = buscarAlunoPorId(req.params.id)
    res.send(index)
})

app.put('/alunos/:id', (req, res) => {
    let index = buscarIndexAluno(req.params.id)
    alunos[index].nome = req.body.nome
    alunos[index].curso = req.body.curso
    res.send(alunos)
})

export default app;