import express from 'express'
import routes from './routes'
import cors from 'cors'

import './database'
import { resolve } from 'path'

const corsOption = {
  origin: 'https://front-hamburgueria.vercel.app',
  credentials: true
}

class App {
  constructor () {
    this.app = express()
    this.app.use(cors(corsOption))
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')))
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )
  }

  routes () {
    this.app.use(routes)
  }
}
export default new App().app
