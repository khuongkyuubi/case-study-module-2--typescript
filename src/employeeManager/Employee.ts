export class Employee {
    private _name: string;
    private _email: string;
    private _address: string;
    private _phone: string;
    private _createAt: Date;
    // private static ID: number = 0;

    constructor(name: string, email: string, address: string, phone: string) {
        this._name = name;
        this._email = email;
        this._address = address;
        this._phone = phone;
        this._createAt = new Date();
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }
}