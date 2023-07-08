/* eslint-disable no-unused-vars */

import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store (request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required()

      })
      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }
      const { admin: isAdmin } = await User.findByPk(request.userId)
      if (!isAdmin) {
        return response.status(401).json()
      }

      // eslint-disable-next-line no-use-before-define
      const { name } = request.body
      const { filename: path } = request.file

      const categoryExist = await Category.findOne({
        where: {
          name
        }
      })
      if (categoryExist) {
        return response.status(400).json({ error: 'Category already exist' })
      }

      const { id } = await Category.create({
        name, path
      })
      return response.json({ id, name })
    } catch (err) {
      console.log(err)
    }
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()

      })
      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }
      const { admin: isAdmin } = await User.findByPk(request.userId)
      if (!isAdmin) {
        return response.status(401).json()
      }

      // eslint-disable-next-line no-use-before-define
      const { name } = request.body
      const { id } = request.params
      const category = await Category.findByPk(id)
      if (!category) {
        return response.status(401).json({ error: 'make sure your category id is correct' })
      }

      let path
      if (request.path) {
        path = request.file.filename
      }

      await Category.update({
        name, path
      }, { where: { id } })
      return response.status(200).json({ id, name })
    } catch (err) {
      console.log(err)
    }
  }

  async index (request, response) {
    const category = await Category.findAll()

    return response.json(category)
  }
}

export default new CategoryController()