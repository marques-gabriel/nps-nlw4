import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { resolve } from 'path'
import { SurveysRepository } from "../repositories/SurveysRepository";


/**
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores = 0 - 6
 * Passivos = 7 - 8
 * Promotores = 9 - 10
 * 
 * (Promotores - detratores) / (Respondentes) * 100
 */
class NpsController {
    async execute(request: Request, response: Response) {

        const { survey_id } = request.params
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

       const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length

        const passives = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length

        const totalAnswers = surveysUsers.length

        const calculate = Number(
            (( (promoters - detractor) / totalAnswers  ) * 100).toFixed(2)
        )

        // return response.json({
        //     detractor,
        //     promoters,
        //     passives,
        //     totalAnswers,
        //     nps: calculate
        // })
        const surveysRepository = getCustomRepository(SurveysRepository)
        const survey = await surveysRepository.findOne({id: survey_id})


        const npsPath = resolve(__dirname, "..", "views", "nps.handlebars")
        response.render(npsPath, { detractor, promoters, passives, totalAnswers, nps: calculate, survey })
    }
}

export { NpsController }