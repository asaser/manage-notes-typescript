// Todo zmienic nazwe tego pliku oraz nazwe folderu
// Todo mozna tutaj wstawic wszystkie errory
// Todo to chyba mozna cale usunac bo nie widze duzego sensu posiadania tego

class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

// Todo dodac jakies sensowne readme aby zrobic dokumentacje

// Status code: 401
export class UnauthorizeError extends HttpError {}

// Status code: 409
export class ConflictError extends HttpError {}