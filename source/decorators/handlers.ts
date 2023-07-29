import { HttpMethod } from '@/services/httpServer';
import { Reflection } from '@abraham/reflection';

export interface RouteItem {
  method: HttpMethod;
  path: string;
  handlerName: string | symbol;
}

function generateMethodDecorator(
	method: HttpMethod
): (path: string) => MethodDecorator {
	return (path: string): MethodDecorator => {
		return (
			target: NonNullable<unknown>,
			propertyKey: string | symbol
		): void => {
			const controllerClass = target.constructor;
			const routers: RouteItem[] = Reflection.hasMetadata(
				'routers',
				controllerClass
			)
				? Reflection.getMetadata('routers', controllerClass) ?? []
				: [];

			routers.push({ method, path, handlerName: propertyKey });

			Reflection.defineMetadata('routers', routers, controllerClass);
		};
	};
}

export const Get = generateMethodDecorator(HttpMethod.Get);
export const Post = generateMethodDecorator(HttpMethod.Post);
export const Put = generateMethodDecorator(HttpMethod.Put);
export const Path = generateMethodDecorator(HttpMethod.Patch);
export const Delete = generateMethodDecorator(HttpMethod.Delete);

