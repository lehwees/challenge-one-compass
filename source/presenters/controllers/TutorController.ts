/* eslint-disable no-mixed-spaces-and-tabs */
import { StatusCode } from '@/core/StatusCode';
import { TutorControllerInterface } from '@/core/controllers/TutorControllerInterface';
import { Controller } from '@/decorators/controller';
import { Delete, Get, Post, Put } from '@/decorators/handlers';
import TutorModel from '@/models/TutorModel';
import { Request, Response } from 'express';
import { tutorValidatorSchema } from '../schemas/TutorValidatorSchema';
import { ObjectId } from 'mongodb';

@Controller('/tutors')
export class TutorController
implements TutorControllerInterface<Request, Response>
{
  @Get('')
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const tutors = await TutorModel.aggregate([
				{ $unwind: { path: '$pets' } },
				{
					$lookup: {
						from: 'pets',
						localField: 'pets.petId',
						foreignField: 'id',
						as: 'pets',
					},
				},
				{
					$unwind: { path: '$pets' },
				},
				{
					$group: { _id: '$_id', pets: { $push: '$pets' } },
				},
				{
					$lookup: {
						from: 'tutors',
						localField: '_id',
						foreignField: '_id',
						as: 'tutorDetails',
					},
				},
				{
					$unwind: { path: '$tutorDetails' },
				},
				{
					$addFields: { 'tutorDetails.pets': '$pets' },
				},
				{
					$replaceRoot: { newRoot: '$tutorDetails' },
				},
			]);
			if (!tutors) {
				res.sendStatus(StatusCode.NOT_FOUND);
				return;
			}
			res.status(StatusCode.OK).send(tutors);
		} catch (error) {
			res.status(StatusCode.SERVER_ERROR).send;
		}
	}

  @Post('')
  async create(req: Request, res: Response): Promise<void> {
  	try {
  		const tutor = await tutorValidatorSchema.validate(req.body);
  		if (!tutor) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}
  		const alreadyExists = await TutorModel.findOne({ email: tutor.email });
  		if (alreadyExists) {
  			res.sendStatus(StatusCode.UNAUTHORIZED);
  			return;
  		}
  		await TutorModel.create(tutor);
  		res.sendStatus(StatusCode.CREATED);
  	} catch (error) {
  		res.status(StatusCode.SERVER_ERROR).send(error);
  	}
  }

  @Put('tutor/:id')
  async update(req: Request, res: Response): Promise<void> {
  	try {
  		const tutorId = req.params.id;
  		if (!tutorId || !ObjectId.isValid(tutorId)) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}

  		const tutorExists = await TutorModel.findById(tutorId);
  		if (!tutorExists) {
  			res.sendStatus(StatusCode.NOT_FOUND);
  			return;
  		}

  		const tutor = await tutorValidatorSchema.validate(req.body);

  		if (!tutor) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}
  		await TutorModel.findByIdAndUpdate(tutorId, tutor);
  		res.sendStatus(StatusCode.OK);
  	} catch (error) {
  		res.status(StatusCode.SERVER_ERROR).send(error);
  	}
  }

  @Delete('tutor/:id')
  async delete(req: Request, res: Response): Promise<void> {
  	try {
  		const tutorIdDel = req.params.id;
  		if (!tutorIdDel || !ObjectId.isValid(tutorIdDel)) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  			return;
  		}

  		const tutorExists = await TutorModel.findById(tutorIdDel);
  		if (!tutorExists) {
  			res.sendStatus(StatusCode.NOT_FOUND);
  			return;
  		}

  		const tutorIdValidate = await tutorValidatorSchema.validate(req.body);
  		if (!tutorIdValidate) {
  			res.sendStatus(StatusCode.UNPROCESSABLE);
  		}

  		const tutorId = await TutorModel.deleteOne();
  		if (!tutorId) {
  			res.sendStatus(StatusCode.BAD_REQUEST);
  			return;
  		}
  		res.sendStatus(StatusCode.ACCEPTED);
  	} catch (error) {
  		res.status(StatusCode.SERVER_ERROR).send(error);
  	}
  }
}
