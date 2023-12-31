import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import Logger from 'bunyan';
import 'express-async-errors';
import { config } from '@configs/configEnvs';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { IErrorResponse } from '@errors/interfaces/errorResponse.interface';
import { CustomError } from '@errors/customError';
import applicationRoutes from '@interfaces/http/routes';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('server');

// SINGLE RESPONSABILITY: S
// OPEN/CLOSED: O
export class AppLab2 {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void {

		this.securityMiddleware(this.app);
		this.standardMiddleware(this.app);
		this.routeMiddleware(this.app);
		this.globalErrorHandler(this.app);
		this.startServer(this.app);
	}

	private securityMiddleware(app: Application): void {
		app.use(
			cookieSession({
				name: 'session',
				keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
				maxAge: 24 * 7 * 3600000,
				secure: config.NODE_ENV !== 'development'
			})
		);
		app.use(hpp());
		app.use(helmet());
	  app.use(cors({
			origin: config.CLIENT_URL,
			credentials: true,
			optionsSuccessStatus: 200,
			methods: ['GET', 'POST', 'PUT', 'DELETE']
		})
		);
	}

	private standardMiddleware(app: Application): void {
		app.use(compression());
		app.use(json({ limit: '5mb' }));
		app.use(urlencoded({ extended: true, limit: '5mb' }));
	}

	private routeMiddleware(app: Application): void {
		applicationRoutes(app);
	}

	private globalErrorHandler(app: Application): void {
		app.all('*', (req: Request, res: Response) => {
			res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
		});

		app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
			log.error(error);
			if (error instanceof CustomError) {
				return res.status(error.statusCode).json(error.serializeErrors());
			}
			next();
		});
	}

	private startHttpServer(httpServer: http.Server): void {
		const PORT = Number(config.SERVER_PORT);
		httpServer.listen(PORT, () => {
			log.info(`Server running at ${PORT}.`);
		});
	}

	private async startServer(app: Application): Promise<void> {
		try {
			const httpServer: http.Server = new http.Server(app);
			const socketIO: Server = await this.createSocketIO(httpServer);
			this.startHttpServer(httpServer);
			this.socketIOConnections(socketIO);
		} catch (error) {
			log.error(error);
		}
	}

	private async createSocketIO(httpServer: http.Server): Promise<Server> {
		const io: Server = new Server(httpServer, {
			cors: {
				origin: config.CLIENT_URL,
				methods: ['GET', 'POST', 'PUT', 'DELETE']
			}
		});
		const pubClient = createClient({ url: config.REDIS_HOST });
		const subClient = pubClient.duplicate();
		await Promise.all([pubClient.connect(), subClient.connect()]);
		io.adapter(createAdapter(pubClient, subClient));
		return io;
	}

	private socketIOConnections(io: Server): void {
		console.log(io);
		log.info('SocketIO Connections OK.');
	}
}
