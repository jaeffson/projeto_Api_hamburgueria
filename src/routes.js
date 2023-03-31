import { Router } from 'express';

const routes = new Router();
import UserController from './app/controllers/UserController.js';

routes.post('/users', UserController.store)
  
export default routes;
