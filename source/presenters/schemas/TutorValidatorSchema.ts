import { number, object, string } from 'yup';

export const tutorValidatorSchema = object({
	id: number().required(),
	name: string().required(),
	phone: string().required(),
	email: string().required(),
	date_of_birth: string().required(),
	zip_code: string().required(),
});