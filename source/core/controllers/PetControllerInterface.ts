import { HttpRequestHandler } from '@/services/httpServer';


export interface PetControllerInterface<T, D>{
    getAll: HttpRequestHandler<T, D>
    create: HttpRequestHandler<T, D>
    update: HttpRequestHandler<T, D>
    delete: HttpRequestHandler<T, D>
}