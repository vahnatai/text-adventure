/**
 * CommandError indicates the user messed-up in forming a command, as opposed
 * to system failure.
 */
class CommandError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, CommandError);
    }
}

export default CommandError;
