import app from './app'

const port = process.env.PORT || 3001
console.log(`Servidor rodando na porta ${port}`)
// eslint-disable-next-line no-self-compare
if (port === port) {
  console.log('Servidor Ativo')
}
app.listen(port, '0.0.0.0')
