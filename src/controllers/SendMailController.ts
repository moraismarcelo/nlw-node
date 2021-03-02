import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUserRepository';
import { UsersRepository } from '../repositories/UsersRepository';

    class SendMailController {
        async execute(request: Request, response: Response){
            const {email, survey_id} = request.body;

            const usersRepository = getCustomRepository(UsersRepository);

            const surveysRepository = getCustomRepository(SurveysRepository);

            const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

            const userAlreadyExists = await usersRepository.findOne(email);

            if (!userAlreadyExists){
                return response.status(400).json({
                    error: "User does not exists"
                });
            }

            const surveyAlreadyExists = await surveysRepository.findOne({id: survey_id});

            if (!surveyAlreadyExists){
                return response.status(400).json({
                    error: "Survey doesn't exists"
                })
            }

            //salvar na tabela surveys_users

            // enviar email para o user parei no 24:00
        }
    }

export {SendMailController}