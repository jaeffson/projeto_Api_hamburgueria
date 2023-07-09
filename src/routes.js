
import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './App/controllers/UserController'
import SessionController from './App/controllers/SessionController'
import ProductController from './App/controllers/ProductController'
import AuthMiddLeares from './App/middlewares/auth'
import CategoryController from './App/controllers/CategoryController'
import OrderController from './App/controllers/OrderController'

const upload = multer(multerConfig)
const routes = new Router()

// eslint-disable-next-line no-undef
routes.get('/', res => {
  return res.json({ message: 'Hello API' })
})

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(AuthMiddLeares)// será chamada por todas as rotas abaixo

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
