import Sequelize  from 'sequelize';
import User from '../app/models/User.js';
import configDatabase from '../config/database.js'

const models = [User]




class database{
    constructor(){
        this.init()
    }
    init(){
        this.conection = new Sequelize(configDatabase)
        models.map(model => model.init(this.conection))
    }
}
export default  new database()