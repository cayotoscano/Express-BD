import app from './app.js'
import pool from './database/connection.js'

const port = Number(process.env.PORT) || 3000

async function start() {
  try {
    const connection = await pool.getConnection()

    app.log.info('Conexão com o banco de dados estabelecida')

    connection.release()

    await app.listen({
      port,
      host: '0.0.0.0'
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

async function shutdown(signal) {
  app.log.info(`${signal} recebido. Encerrando aplicação...`)

  try {
    await app.close(0)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

await start()