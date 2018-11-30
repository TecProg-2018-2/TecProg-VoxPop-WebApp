export interface LoggerInterface {
    warn(message: string, supportDetails: any[]);
    debug(message: string, supportDetails: any);
    error(message: string, supportDetails: any[]);
    info(message: string, supportDetails: any[]);
}

export class Log implements LoggerInterface{
    public debug(message: string, supportDetails: any) {

    }

    public warn(message: string, supportDetails: any[]) {

    }

    public info(message: string, supportDetails: any[]) {

    }

    public error(message: string, supportDetails: any[]) {

    }

    private emmitLogMessage(messageType: string, message: string, supportDetails: any[]) {
        if (supportDetails.length > 0) {
            console[messageType](message, supportDetails);
        } else {
            console[messageType](message);
        }
    }
}