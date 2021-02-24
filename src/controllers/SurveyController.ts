import { request, Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveysRepository } from "../repositories/SurveysRepository"

class SurveyController {
    async create(resquest: Request, response: Response) {
        const { title, description } = request.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = surveysRepository.create({
            title,
            description
        })

        await surveysRepository.save(survey)

        return response.status(201).json(survey)
    }
}

export { SurveyController }
