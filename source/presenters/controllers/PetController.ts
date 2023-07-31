/* eslint-disable no-mixed-spaces-and-tabs */
import { StatusCode } from '@/core/StatusCode';
import { PetControllerInterface } from '@/core/controllers/PetControllerInterface';
import { Controller } from '@/decorators/controller';
import { Delete, Get, Post, Put } from '@/decorators/handlers';
import PetModel from '@/models/PetModel';
import { Request, Response } from 'express';
import { petValidationSchema } from '../schemas/PetValidationSchema';
import TutorModel from '@/models/TutorModel';

@Controller('/pet')
export class PetController
implements PetControllerInterface<Request, Response>
{
  @Get('')
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const pet = await PetModel.find();
			if (!pet) {
				res.sendStatus(StatusCode.NOT_FOUND);
				return;
			}
			res.sendStatus(StatusCode.OK).send(pet);
		} catch (error) {
			res.sendStatus(StatusCode.SERVER_ERROR);
		}
	}

  @Post('/:tutorId')
  async create(req: Request, res: Response): Promise<void> {
  	try {
  		const tutorId = req.params.tutorId;

  		const pet = await petValidationSchema.validate(req.body);
  		if (!pet) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}
  		const alreadyExists = await PetModel.findOne({ id: pet.id });
  		if (alreadyExists) {
  			res.sendStatus(StatusCode.UNAUTHORIZED);
  			return;
  		}

  		const createdPet = await PetModel.create(pet);

  		await TutorModel.updateOne(
  			{ id: tutorId },
  			{ $push: { pets: { petId: createdPet.id } } }
  		);

  		res.sendStatus(StatusCode.CREATED);
  	} catch (error) {
  		res.status(StatusCode.SERVER_ERROR).send(error);
  	}
  }

  @Put('/:petId/tutor/:tutorId')
  async update(req: Request, res: Response): Promise<void> {
  	try {
  		const petId = req.params.petId;
  		const tutorId = req.params.tutorId;

  		if (!petId || !tutorId) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}

  		const tutorExists = await TutorModel.findOne({ id: tutorId });
  		if (!tutorExists) {
  			res.sendStatus(StatusCode.NOT_FOUND);
  			return;
  		}

  		const updatePet = await PetModel.findOneAndUpdate(
  			{ id: petId },
  			req.body
  		);

  		if (!updatePet) {
  			res.sendStatus(StatusCode.BAD_REQUEST);
  			return;
  		}

  		res.sendStatus(StatusCode.OK);
  	} catch (error) {
  		res.status(StatusCode.SERVER_ERROR).send(error);
  	}
  }

  @Delete('/:petId/tutor/:tutorId')
  async delete(req: Request, res: Response): Promise<void> {
  	try {
  		const petId = req.params.petId;
  		const tutorId = req.params.tutorId;

  		if (!petId || !tutorId) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}

  		const tutorExists = await TutorModel.findOne({ id: tutorId });
  		if (!tutorExists) {
  			res.sendStatus(StatusCode.NOT_FOUND);
  			return;
  		}

  		const deletedPet = await PetModel.findOneAndDelete({ id: petId });

  		const deletedPetInTutor = await TutorModel.findOneAndUpdate(
  			{ id: tutorId },
  			{ $pull: { petId: petId } }
  		);

  		if (!deletedPet || !deletedPetInTutor) {
  			res.sendStatus(StatusCode.BAD_REQUEST);
  			return;
  		}

  		res.sendStatus(StatusCode.OK);
  	} catch (error) {
  		res.sendStatus(StatusCode.SERVER_ERROR);
  	}
  }
}
