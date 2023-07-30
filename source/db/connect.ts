import { PetSchema } from '@/schemas/PetSchema';
import { TutorSchema } from '@/schemas/TutorSchema';
import mongoose from 'mongoose';

function connectMongoDB (url: string): void {
	if(!url) return;
	try {
		mongoose.connect(url);
		mongoose.model('Pet', PetSchema);
		mongoose.model('Tutor', TutorSchema);
		console.log('DataBase Connected');
	} catch (error) {
		return;
	}
}

export default connectMongoDB;


