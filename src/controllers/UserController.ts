import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../models/User"

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body

        // criar repositório de usuário para ter acesso a métodos no typeorm
        const useraRepository = getRepository(User)

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await useraRepository.findOne({
            email
        })

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }

        const user = useraRepository.create({
                name, email
        })

        await useraRepository.save(user) 
        
        return response.json(user)
    }
}

export { UserController }