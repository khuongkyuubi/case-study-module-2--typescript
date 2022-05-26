import {Employee} from "./Employee.js";

export class EmployeeManager {
    employeeList: Employee[] = [new Employee("khương", "khương.kyuubi@gmail.com", "hanoi","98465354")];

    addEmployee(name: string, age: string, phone: string, email: string) {
        let employee = new Employee(name, age, phone, email)
        this.employeeList.push(employee);
        // this.renderList(this.employeeList)
    }

    insertEmployee(employee: Employee): void {
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

    removeEmployee(index: number): void {
        this.employeeList.splice(index, 1);
        // this.renderList(this.employeeList);
    }

    edit(index) {
        (document.getElementById('name-confirm') as HTMLInputElement).value = this.employeeList[index].name;
        (document.getElementById('age-confirm') as HTMLInputElement).value = this.employeeList[index].address;
        (document.getElementById('phone-confirm') as HTMLInputElement).value = this.employeeList[index].phone;
        (document.getElementById('email-confirm') as HTMLInputElement).value = this.employeeList[index].email;
        (document.getElementById('index') as HTMLInputElement).value = index;
        console.log(index)

    }


}