
import express  from 'express'
const app = express()

app.use(express.json());

 
const alunos = [
    
        {id:1, nome: 'bruno', curso: 'ads'},
        {id:2, nome: 'maria', curso: 'ads'},
        {id:3, nome: 'LARA', curso: 'ads'},
        {id:4, nome: 'jose', curso: 'ads'}
]

//funçao auxiliar 

function buscarAlunoPorId(id){
    return alunos.filter(aluno => aluno.id == id)
}

function buscarIndexAluno(id){
    return alunos.findIndex(aluno => aluno.id == id)
}

// criando a nota raiz
app.get('/',(req, res) =>{
    res.send('minha api rest com express')
})

// rota lista alunos GET
app.get('/alunos',(req,res) => {
    res.status(200).send(alunos);
});

//rota lista alunos POST
app.post('/alunos',(req,res) => {
    alunos.push(req.body)
    res.status(201).send('aluno cadastrado com sucesso!');
});

//buscar aluno por ID
app.get('/alunos/:id', (req, res) => {
    res.json(buscarAlunoPorId(req.params.id))
})


// Update
app.put('/alunos/:id', (req,res) => {
    let index = buscarIndexAluno(req.params.id)
    alunos[index].nome = req.body.nome
    alunos[index].curso = req.body.curso
    res.send(alunos)
})

// DELETE
app.delete('/alunos/:id',(req,res) => {
    let index = buscarIndexAluno(req.params.id)
    //console.log(index)
    alunos.splice(index, 1)
    res.send(`aluno com id ${req.params.id} excluido com sucesso!`)
});

export default app