import { Request, Response } from "express"

class UserController {

    async create(request: Request, response: Response) {
        const body = request.body

        return body
    }
}

export { UserController }