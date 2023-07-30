import { PetSchema } from '@/schemas/PetSchema';
import mongoose from 'mongoose';


export default mongoose.model('Pet', PetSchema); 