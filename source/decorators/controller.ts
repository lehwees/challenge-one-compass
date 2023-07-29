import { Reflection } from '@abraham/reflection';

export function Controller(path: string): ClassDecorator {
	return (target: NonNullable<unknown>) =>  {Reflection.defineMetadata('basePath', path, target);};
}