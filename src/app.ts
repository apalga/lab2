import express, { Express } from 'express';
import { AppLab2 } from '@bootstrap/setupServer.bootstrap';
import { config } from '@configs/configEnvs';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';

class Application {

	public initialize(): void {
		this.loadConfig();
		databaseConnection();
		const app: Express = express();
		const server: AppLab2 = new AppLab2(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: Application = new Application();
application.initialize();
