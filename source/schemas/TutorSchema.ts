import mongoose from 'mongoose';

export interface TutorSchemaInterface{
    id: number,
    name: string,
    phone: string,
    email: string,
    date_of_birth: string,
    zip_code: string,
    pets: {petId: number}[]
}

export const TutorSchema = new mongoose.Schema<TutorSchemaInterface>({
	id: Number,
	name: String,
	phone: String,
	email: String,
	date_of_birth: String,
	zip_code: String,
	pets: [{petId: Number}]
});



