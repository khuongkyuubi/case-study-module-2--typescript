export class User {
    private _firstName : string;
    private _lastName : string;
    private _emailAddress : string;
    private _password : string;

    constructor(firstName: string, lastName: string, emailAddress: string, password: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._emailAddress = emailAddress;
        this._password = password;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}