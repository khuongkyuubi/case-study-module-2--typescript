import { Employee } from "./Employee.js";
export class EmployeeManager {
    constructor() {
        this.employeeList = [new Employee("khương", "khương.kyuubi@gmail.com", "hanoi", "98465354")];
    }
    addEmployee(name, age, phone, email) {
        let employee = new Employee(name, age, phone, email);
        this.employeeList.push(employee);
        // this.renderList(this.employeeList)
    }
    insertEmployee(employee) {
        this.employeeList.push(employee);
        // this.renderList(this.employeeList);
    }
    // renderList(arr: Employee[]): void {
    //     let html = "";
    //     if (arr.length === 0) {
    //         html += "<tr>"
    //         html += "<td>No Data</td>"
    //         html += "</tr>"
    //     } else {
    //         for (let i = 0; i < arr.length; i++) {
    //             html += "<tr>"
    //             html += `<td>${i + 1}</td>`
    //             html += `<td>${arr[i].name}</td>`
    //             html += `<td>${arr[i].email}</td>`
    //             html += `<td>${arr[i].address}</td>`
    //             html += `<td>${arr[i].phone}</td>`
    //             html += `<td>
    //                  <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
    //                                                                                      data-toggle="tooltip"
    //                                                                                      title="Edit">&#xE254;</i></a>
    //                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons"
    //                                                                                          data-toggle="tooltip"
    //                                                                                          title="Delete">&#xE872;</i></a>
    //                 </td>`
    //             html += "</tr>"
    //         }
    //     }
    //     document.getElementById('employee-list').innerHTML = html;
    // }
    removeEmployee(index) {
        this.employeeList.splice(index, 1);
        // this.renderList(this.employeeList);
    }
    edit(index) {
        document.getElementById('name-confirm').value = this.employeeList[index].name;
        document.getElementById('age-confirm').value = this.employeeList[index].address;
        document.getElementById('phone-confirm').value = this.employeeList[index].phone;
        document.getElementById('email-confirm').value = this.employeeList[index].email;
        document.getElementById('index').value = index;
        console.log(index);
    }
}
//# sourceMappingURL=EmployeeManager.js.map