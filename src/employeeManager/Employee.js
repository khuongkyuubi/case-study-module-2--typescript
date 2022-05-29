export class Employee {
    // private static ID: number = 0;
    constructor(name, email, address, phone) {
        this._name = name;
        this._email = email;
        this._address = address;
        this._phone = phone;
        this._createAt = new Date();
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
}
//# sourceMappingURL=Employee.js.map