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
    this.connection = new Sequelize(
      'postgresql://postgres:wNFCvPsVUoJxip9A3FjE@containers-us-west-189.railway.app:6468/railway')
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models))
  }

  // conexao com mongodb
  mongo () {
    this.mongoConection = mongoose.connect('mongodb://mongo:5yE3pV3bq4MpnxUttoO0@containers-us-west-38.railway.app:7950', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

export default new Database()
