import { PetSchemaInterface } from './PetSchema';
import mongoose from 'mongoose';

export interface TutorSchemaInterface{
    name: string,
    phone: string,
    email: string,
    date_of_birth: string,
    zip_code: string,
    pets: PetSchemaInterface[]
}

export const TutorSchema = new mongoose.Schema<TutorSchemaInterface>({
	name: String,
	phone: String,
	email: String,
	date_of_birth: String,
	zip_code: String,
	pets: String
});



