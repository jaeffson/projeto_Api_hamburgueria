//Padrao MVC
//STORE > CADASTRAR -/ ADICIONAR
//INDEX > LISTAR VARIOS
//SHOW > LISTAR APENAS UM
//UPDATE > ATUALIZAR
//DELETE > DELETAR
import { v4 } from "uuid"
import User from "../models/User.js"
import * as Yup from 'yup' //esquema de validacao


class UserController{
    async store(request,response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email:Yup.string().email().required(),
            password_hash:Yup.string().required().min(6),
            admin:Yup.boolean(),
        
           }) 
      console.log( await schema.isValid(request.body))
           const {name,email,password_hash,admin} = request.body
         const user = await User.create({
            id:v4(),
            name,
            email,
            password_hash,
            admin,
         })
        
      
      return response.json({id:user.id,name,email,admin})
    }
}
export default new UserController()