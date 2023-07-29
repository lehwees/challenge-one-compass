import { TutorController } from './TutorController';
import { PetController } from './PetController';

export const controllerList: {new(): unknown}[] = [TutorController, PetController];
