export class BadRequestException {

    name: string;
    message: string;
    stack: string | undefined;

    constructor(message: string) {
        this.name = 'Bad Request';
        this.message = message || 'Bad Request Exception';
        this.stack = (new Error()).stack;
    }
}