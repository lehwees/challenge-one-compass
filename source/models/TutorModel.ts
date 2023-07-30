import { TutorSchema } from '@/schemas/TutorSchema';
import mongoose from 'mongoose';





export default mongoose.model('Tutor', TutorSchema);