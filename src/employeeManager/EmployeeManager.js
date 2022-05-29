import { Employee } from "./Employee.js";
export class EmployeeManager {
    constructor() {
        this._employeeList = JSON.parse(localStorage.getItem("_employeeList")) || []; /*= [new Employee("khương", "khương.kyuubi@gmail.com", "hanoi", "98465354")];*/
    }
    get employeeList() {
        return this._employeeList;
    }
    setEmployeeList(employeeList) {
        this._employeeList = employeeList;
    }
    saveEmployeeListToLocal() {
        localStorage.setItem("_employeeList", JSON.stringify(this._employeeList));
    }
    addEmployee(name, age, phone, email) {
        let employee = new Employee(name, age, phone, email);
        this._employeeList.push(employee);
        this.saveEmployeeListToLocal();
        // this.renderList(this.employeeList)
    }
    removeEmployee(index) {
        this._employeeList.splice(index, 1);
        this.saveEmployeeListToLocal();
        // this.renderList(this.employeeList);
    }
}
//# sourceMappingURL=EmployeeManager.js.map