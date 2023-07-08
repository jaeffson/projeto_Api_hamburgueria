/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize'
import User from '../App/models/User'
import configDatabase from '../config/database'
import Product from '../App/models/Product'
import Category from '../App/models/Category'
import mongoose from 'mongoose'

const models = [User, Product, Category]

class Database {
  constructor () {
    this.init()
    this.mongo()
  }

  // conexao com sequelize
  init () {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models))
  }

  // conexao com mongodb
  mongo () {
    this.mongoConection = mongoose.connect('mongodb://localhost:27017/coderburger', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

export default new Database()
