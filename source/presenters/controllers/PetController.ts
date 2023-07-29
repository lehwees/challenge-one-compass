/* eslint-disable no-mixed-spaces-and-tabs */
import { PetControllerInterface } from '@/core/controllers/PetControllerInterface';
import { Controller } from '@/decorators/controller';
import { Delete, Get, Post, Put } from '@/decorators/handlers';
import { Request, Response } from 'express';


@Controller('/pet')
export class PetController implements PetControllerInterface<Request, Response>{

    @Get('')
	async getAll(req: Request, res: Response): Promise<void>{
		res.sendStatus(200);
	}

    @Post('/:id')
    async create(req: Request, res: Response): Promise<void>{
    	res.sendStatus(201);
    }

    @Put('/:id/tutor/:id')
    async update(req: Request, res: Response): Promise<void>{
    	res.sendStatus(204);
    }

    @Delete('/:id/tutor/:id')
    async delete(req: Request, res: Response): Promise<void>{
    	res.sendStatus(200);
    }


}