import { object, string, number } from 'yup';

export const petValidationSchema = object({
	id: number().required(),
	name: string().required(),
	species: string().required(),
	carry: string().required(),
	weight: number(). required(),
	date_of_birth: string().required()
});