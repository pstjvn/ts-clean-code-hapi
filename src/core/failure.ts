export class Failure {
    message: string;
    details: unknown;
    constructor(error: Error | string, details?: unknown) {
        this.message = typeof error === 'string' ? error : error.message;
        this.details = error instanceof Error ? error : details;
    }
}