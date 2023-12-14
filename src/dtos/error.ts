export class AppError {

	public status: number;
	public message: string;

	constructor(message: string, statusCode?: number) {
		this.message = message;
		this.status = statusCode || 400;
	}

}