import mongoose from 'mongoose';

export interface PetSchemaInterface {
    name: string,
    species: string,
    carry: string,
    weight: number,
    date_of_birth: string
}

export const PetSchema = new mongoose.Schema<PetSchemaInterface>({
	name: String,
	species: String,
	carry: String,
	weight: Number,
	date_of_birth: String
});
