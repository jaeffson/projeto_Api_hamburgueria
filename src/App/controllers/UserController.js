// Padrao MVC
// STORE > CADASTRAR -/ ADICIONAR
// INDEX > LISTAR VARIOS
// SHOW > LISTAR APENAS UM
// UPDATE > ATUALIZAR
// DELETE > DELETAR
import { v4 } from 'uuid'
import User from '../models/User.js'
import * as Yup from 'yup' // esquema de validacao

class UserController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean()
    })
    // validando erros
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }
    const { name, email, password, admin } = request.body

    const userExist = await User.findOne({
      where: { email }
    })
    if (userExist) {
      return response.status(400).json({ error: 'User already exist' })
    }
    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin
    })

    return response.status(201).json({ id: user.id, name, email, admin })
  }
}
export default new UserController()
