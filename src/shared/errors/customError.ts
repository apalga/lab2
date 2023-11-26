import { IError } from './interfaces/error.interface';

// Singleton
export abstract class CustomError extends Error {
	//pattern facade
	abstract statusCode: number;
	abstract status: string;

	constructor(message: string) {
		super(message);
	}

	serializeErrors(): IError {
		return {
			message: this.message,
			status: this.status,
			statusCode: this.statusCode
		};
	}
}
