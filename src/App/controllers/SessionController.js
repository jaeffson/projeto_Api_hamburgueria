/* eslint-disable no-unused-vars */
import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import AuthConfig from '../../config/auth'

class SessionController {
  async store (request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
      // eslint-disable-next-line indent
        })
    const userEmailOrPasswordIncorret = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' })
    }
    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorret()

    const { email, password } = request.body
    const user = await User.findOne({
      where: { email }
    })

    if (!user) userEmailOrPasswordIncorret()

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorret()
    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
