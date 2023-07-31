import mongoose from 'mongoose';

export interface PetSchemaInterface {
    id: number,
    name: string,
    species: string,
    carry: string,
    weight: number,
    date_of_birth: string
}

export const PetSchema = new mongoose.Schema<PetSchemaInterface>({
	id: Number,
	name: String,
	species: String,
	carry: String,
	weight: Number,
	date_of_birth: String
});
