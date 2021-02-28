import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import * as yup from "yup"
import { AppError } from "../errors/AppError"
import { resolve } from 'path'

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body

        console.log(request.body)

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("Email incorreto")
        })

        // if(! (await schema.isValid(request.body))) {
        //     return response.status(400).json({
        //         error: "Validation Failed"
        //     })
        // }

        try {
           await schema.validate(request.body, { abortEarly: false})
        } catch (err) {

            throw new AppError(err)

            // return response.status(400).json({
            //     error: err
            // })
        }

        // criar repositório de usuário para ter acesso a métodos no typeorm
        // const userRepository = getRepository(User)
        const usersRepository = getCustomRepository(UsersRepository)

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(userAlreadyExists) {
            throw new AppError("User already exists!")

            // return response.status(400).json({
            //     error: "User already exists!"
            // })
        }

        const user = usersRepository.create({
                name, email
        })

        await usersRepository.save(user) 
        
        return response.status(201).json(user)
    }

    async form(request: Request, response: Response) {
        const userPath = resolve(__dirname, "..", "views", "user.handlebars")
        response.render(userPath)
    }
}

export { UserController }
