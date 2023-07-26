import { HttpServerService } from '@/services/HttpServerService';
import express, { Application } from 'express';

export class HttpServiceExpress implements HttpServerService{

	private readonly instance: Application;

	constructor(){
		this.instance = express();
	}

	init(port: string) : void{
		this.instance.listen(port, () => console.log('Server Initialize'));
	}
	registerRoutes(){}

    
}