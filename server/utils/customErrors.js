export class ValidationError extends Error {
    constructor(message, errors = []) {
        super(message);
        this.name = "ValidationError";
        this.errors = errors;
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}
