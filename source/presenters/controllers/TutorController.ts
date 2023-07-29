/* eslint-disable no-mixed-spaces-and-tabs */
import { TutorControllerInterface } from '@/core/controllers/TutorControllerInterface';
import { Controller } from '@/decorators/controller';
import { Delete, Get, Post, Put } from '@/decorators/handlers';
import { Request, Response } from 'express';


@Controller('/tutors')
export class TutorController implements TutorControllerInterface <Request, Response>{

    @Get('')
	async getAll(req: Request, res: Response ): Promise<void>{
		res.sendStatus(200);
	}

	@Post('')
    async create(req: Request, res: Response): Promise<void>{
    	res.sendStatus(201);
    }

	@Put('/:id')
	async update(req: Request, res: Response): Promise<void>{
		res.sendStatus(204);
	}

	@Delete('/:id')
	async delete(req: Request, res: Response): Promise<void>{
		res.sendStatus(200);
	}
}




