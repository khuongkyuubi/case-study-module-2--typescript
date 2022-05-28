import {Employee} from "./Employee.js";

export class EmployeeManager {
    private _employeeList: Employee[] = JSON.parse(localStorage.getItem("_employeeList")) || []/*= [new Employee("khương", "khương.kyuubi@gmail.com", "hanoi", "98465354")];*/

    constructor() {
    }


    get employeeList(): Employee[] {
        return this._employeeList;
    }

    setEmployeeList(employeeList: Employee[]): void {
        this._employeeList = employeeList;
    }

    saveEmployeeListToLocal(): void {
        localStorage.setItem("_employeeList", JSON.stringify(this._employeeList));
    }

    addEmployee(name: string, age: string, phone: string, email: string) {
        let employee = new Employee(name, age, phone, email)
        this._employeeList.push(employee);
        this.saveEmployeeListToLocal();

        // this.renderList(this.employeeList)
    }

    removeEmployee(index: number): void {
        this._employeeList.splice(index, 1);
        this.saveEmployeeListToLocal();

        // this.renderList(this.employeeList);
    }

}