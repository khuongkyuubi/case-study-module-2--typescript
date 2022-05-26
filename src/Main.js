// import {EmployeeManager} from "./EmployeeManager";
import { EmployeeManager } from "./EmployeeManager.js";
const employeeManager = new EmployeeManager();
window.addEventListener("load", () => {
    renderEmployeeList(employeeManager);
    // updateButtonDelete()
    // updateDeleteBtn();
});
let index;
function updateAddBtn() {
    let updateAdd = document.getElementById("add-save");
    updateAdd.addEventListener("click", addEmployee);
}
// get input element
let name = document.getElementById('name');
let address = document.getElementById('address');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
function resetAddInput() {
    name["value"] = "";
    address["value"] = "";
    phone["value"] = "";
    email["value"] = "";
}
//
function addEmployee() {
    employeeManager.addEmployee(name["value"], email["value"], address["value"], phone["value"]);
    renderEmployeeList(employeeManager);
    resetAddInput();
}
// for (let i in deleteBtns) {
//     deleteBtns[i].addEventListener("click", ()=> {
//         console.log("Hello")
//     })
// }
//
// function updateDeleteBtns() {
//     const deleteBtns = document.getElementsByClassName("delete-confirm");
//     for (let i in deleteBtns) {
//         deleteBtns[i].addEventListener("click", ()=> {
//             console.log("Hello")
//         })
//     }
//
// }
// updateDeleteBtns();
// update Feature
//get edit input element
let nameEdit = document.getElementById('name-edit');
let addressEdit = document.getElementById('address-edit');
let phoneEdit = document.getElementById('phone-edit');
let emailEdit = document.getElementById('email-edit');
let employeeNumberEdit = document.getElementById('employee-number');
function updateEditBtn() {
    let editBtn = document.getElementsByClassName("edit");
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", () => {
            nameEdit["value"] = employeeManager.employeeList[i].name;
            addressEdit["value"] = employeeManager.employeeList[i].address;
            phoneEdit["value"] = employeeManager.employeeList[i].phone;
            emailEdit["value"] = employeeManager.employeeList[i].email;
            employeeNumberEdit["data"] = i.toString();
            updateSaveEditBtn();
        });
    }
}
function updateSaveEditBtn() {
    let saveEditBtn = document.getElementById("save-edit");
    saveEditBtn.addEventListener("click", () => {
        updateEmployee(employeeNumberEdit["data"]);
    });
}
function resetEditBtn() {
    nameEdit["value"] = "";
    addressEdit["value"] = "";
    phoneEdit["value"] = "";
    emailEdit["value"] = "";
}
function updateEmployee(i) {
    employeeManager.employeeList[i].name = nameEdit["value"];
    employeeManager.employeeList[i].address = addressEdit["value"];
    employeeManager.employeeList[i].phone = phoneEdit["value"];
    employeeManager.employeeList[i].email = emailEdit["value"];
    renderEmployeeList(employeeManager);
    // resetEditBtn();
}
//Delete Feature
function updateButtonDelete() {
    let deleteStudent = document.getElementsByClassName('delete-confirm');
    for (let i = 0; i < deleteStudent.length; i++) {
        deleteStudent[i].addEventListener('click', () => {
            deleteEmployee(i);
        });
    }
}
function deleteEmployee(index) {
    employeeManager.removeEmployee(index);
    renderEmployeeList(employeeManager);
}
function updateCheckbox() {
    // Select/Deselect checkboxes
    let checkbox = document.querySelectorAll('table tbody input[type="checkbox"]');
    let selectAll = document.querySelector("#selectAll");
    selectAll.addEventListener("click", function () {
        if (this.checked) {
            checkbox.forEach(function (checkbox) {
                // checkbox.setAttribute("checked", "checked");
                checkbox["checked"] = true;
            });
        }
        else {
            checkbox.forEach(function (checkbox) {
                checkbox["checked"] = false;
            });
        }
        // updateCheckbox();
    });
    // checkbox.forEach((checkbox) => {
    //
    //     checkbox.addEventListener("click", function() {
    //         this.forEach(function(checkbox){
    //             if (!checkbox["checked"])
    //                 selectAll["checked"] = false;
    //         });
    //     })
    //
    // })
    // checkbox.click(function(){
    //     if(!this.checked){
    //         document.querySelector("#selectAll").checked =false;
    //     }
    // });
}
function updateMultiDeleteBtn() {
    let multiDeleteBtn = document.getElementById("multi-delete");
    multiDeleteBtn.addEventListener("click", () => {
        // removeMultiEmployee()
        console.log("Multi delete");
    });
}
function removeMultiEmployee() {
    let checkbox = document.querySelectorAll('table tbody input[type="checkbox"]');
    let listId = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i]["checked"]) {
            employeeManager.removeEmployee(i);
        }
    }
    renderEmployeeList(employeeManager);
}
function renderEmployeeList(employeeManager) {
    let html = "";
    let arr = employeeManager.employeeList;
    if (arr.length === 0) {
        html += "<tr>";
        html += "<td>No Data</td>";
        html += "</tr>";
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            html += "<tr>";
            html += `
             <td>
                    <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${i}" name="options[]" value="${i}">
                    <label for="checkbox${i}"></label>
                    </span>
            </td>
            `;
            html += `<td>${i + 1}</td>`;
            html += `<td>${arr[i].name}</td>`;
            html += `<td>${arr[i].email}</td>`;
            html += `<td>${arr[i].address}</td>`;
            html += `<td>${arr[i].phone}</td>`;
            html += `<td>
                     <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
                                                                                         data-toggle="tooltip"
                                                                                         title="Edit">&#xE254;</i></a>
                     <a href="#deleteEmployeeModal-${i}" class="delete" data-toggle="modal"><i class="material-icons"
                                                                                             data-toggle="tooltip"
                                                                                             title="Delete">&#xE872;</i></a>
                    </td>`;
            html += `<!-- Delete Modal HTML -->
<div id="deleteEmployeeModal-${i}" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Delete Employee</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete index ${i} these Records?</p>
                    <p class="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="button" id="${i}" class="btn btn-danger delete-confirm"
                    data-dismiss="modal" 
                     value="Delete">
                </div>

        </div>
    </div>
</div>`;
            html += "</tr>";
        }
    }
    document.getElementById('employee-list').innerHTML = html;
    updateAddBtn();
    updateEditBtn();
    updateButtonDelete();
    updateCheckbox();
    updateMultiDeleteBtn();
}
//
//
// let address = document.getElementById('address') as HTMLInputElement;
// let nameConfirm = document.getElementById('name') as HTMLInputElement;
// let ageConfirm = document.getElementById('age') as HTMLInputElement;
// let phoneConfirm = document.getElementById('phone') as HTMLInputElement;
// let emailConfirm = document.getElementById('email') as HTMLInputElement;
//
// function clearInputConfirm() {
//     nameConfirm.value = ""
//     ageConfirm.value = ""
//     phoneConfirm.value = ""
//     emailConfirm.value = ""
// }
//
// //
// document.getElementById('search-data').addEventListener('input', searchStudent)
//
// //search
// function searchStudent() {
//     let searchInput = (document.getElementById('search-data') as HTMLInputElement).value
//     let searchValue = employeeManager.employeeList.filter(value => {
//         return value.name.toUpperCase().includes(searchInput.toUpperCase());
//     })
//     employeeManager.renderList(searchValue)
// }
//
// //
// function editButtonStudent() {
//     let editStudent = document.getElementsByClassName('edit');
//     for (let i = 0; i < editStudent.length; i++) {
//         editStudent[i].addEventListener('click', () => {
//             index = editStudent[i].getAttribute('value');
//             console.log('dfds', index)
//             employeeManager.edit(+index);
//             editButtonStudent()
//         })
//     }
//     document.getElementById('confirm').addEventListener('click', function () {
//         employeeManager.employeeList[index].name = (document.getElementById('name-confirm') as HTMLInputElement).value
//         employeeManager.employeeList[index].address = (document.getElementById('age-confirm') as HTMLInputElement).value
//         employeeManager.employeeList[index].phone = (document.getElementById('phone-confirm') as HTMLInputElement).value
//         employeeManager.employeeList[index].email = (document.getElementById('email-confirm') as HTMLInputElement).value
//         employeeManager.renderList(employeeManager.employeeList)
//         clearInputConfirm()
//     })
//
// }
// function clearInput() {
//     name.value = ''
//     age.value = ''
//     phone.value = ''
//     email.value = ''
// }
// document.getElementById('add').addEventListener('click', saveStudent);
// function saveStudent() {
//     employeeManager.addEmployee(name.value, age.value, phone.value, email.value)
//     clearInput()
//     editButtonStudent()
//     updateButtonDelete()
//
//
// }
// function isRequire(inputElement) {
//     let div = inputElement.parentElement;
//     let error = document.createElement('small');
//     let small = div.appendChild(error);
//
//
//     inputElement.addEventListener('blur', () => {
//         if (inputElement.value === "") {
//             inputElement.style.borderColor = 'red';
//             small.innerText = `nhap ${inputElement.id} vao o chau ei`
//             this.errors++;
//
//         } else {
//             inputElement.style.borderColor = 'blue';
//             this.user[inputElement.id] = inputElement.value;
//             small.hidden = true;
//             this.errors --;
//         }
//     })
// }
// function checkFuck(inputElement){
//
//     let div = inputElement.parentElement;
//     console.log(div.children.length)
//     if(div.children.length > 3){
//         return
//     }
//     let error = document.createElement('small');
//     let small = div.appendChild(error);
//     if (inputElement.value === "") {
//         inputElement.style.borderColor = 'red';
//         small.innerText = `nhap ${inputElement.id} vao o chau ei`
//         this.errors++;
//
//     } else {
//         inputElement.style.borderColor = 'blue';
//         small.hidden = true;
//         this.errors --;
//     }
// }
// isRequire(name)
// isRequire(age)
// isRequire(phone)
// isRequire(email)
//
//# sourceMappingURL=Main.js.map