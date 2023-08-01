import { HttpServerService } from '@/services/httpServer/HttpServerService';
import express, { Application } from 'express';
import { controllerList } from '../controllers';
import { Reflection } from '@abraham/reflection';
import { RouteItem } from '@/decorators/handlers';
import connectMongoDB from '@/db/connect';

const URL = process.env.DB_URL;

export class HttpServiceExpress implements HttpServerService {
	private readonly instance: Application;

	constructor() {
		this.instance = express();
	}

	init(port: string): void {
		this.instance.use(express.json());

		this.registerRoutes();
		connectMongoDB(URL ?? '');
		this.instance.listen(port, () => console.log('Server Initialize'));
	}
	registerRoutes(): void {
		const info: { api: string; handler: string }[] = [];

		controllerList.forEach((controllerClass) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const _instance = new controllerClass() as any;
			const basePath: string = '/api';
        Reflection.getMetadata('basePath', controllerClass) ?? '';
			const routers: RouteItem[] =
        Reflection.getMetadata('routers', controllerClass) ?? [];

			const expressRouter = express.Router();

			routers.forEach(({ method, path, handlerName }) => {
				expressRouter[method](
					path,
					_instance[String(handlerName)].bind(_instance)
				);

				info.push({
					api: `${method.toLocaleUpperCase()} ${basePath + path}`,
					handler: `${controllerClass.name}.${String(handlerName)}`,
				});

				this.instance.use(basePath, expressRouter);
			});
		});
	}
}
