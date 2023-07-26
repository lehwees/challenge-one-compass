export interface HttpServerService {
    init: (port: string) => void
    registerRoutes: () => void

}