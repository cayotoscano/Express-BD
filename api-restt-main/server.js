import app from "./src/app.js"
const port = 3000 

//iniciando o servidor
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})