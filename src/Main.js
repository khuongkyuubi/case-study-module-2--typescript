// import {EmployeeManager} from "./EmployeeManager";
import { EmployeeManager } from "./EmployeeManager.js";
const employeeManager = new EmployeeManager();
window.addEventListener("load", () => {
    renderEmployeeList(employeeManager);
    updateSearchInput();
    // updateEditBtn();
});
// Add new employee
// Get input element
let name = document.getElementById('name');
let address = document.getElementById('address');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
// add function
function updateAddBtn() {
    let updateAdd = document.getElementById("add-save");
    updateAdd.addEventListener("click", addEmployee);
    $("#add-modal").on("click", () => {
        resetAddInput(name, email, address, phone);
    });
}
function resetAddInput(...elements) {
    elements.forEach((element) => {
        element["value"] = "";
        element.setAttribute("class", "form-control");
        element.nextElementSibling.innerHTML = "";
    });
}
// validate function
function validateInput(...element) {
    let count = 0;
    // check name
    if (!element[0]["value"].length) {
        element[0].setAttribute("class", "form-control is-invalid");
        element[0].nextElementSibling.innerHTML = "You must put name";
    }
    else {
        element[0].setAttribute("class", "form-control is-valid");
        element[0].nextElementSibling.innerHTML = "";
        count++;
    }
    // check email
    if ((!element[1]["value"].length) || (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm.test(element[1]["value"]))) {
        element[1].setAttribute("class", "form-control is-invalid");
        element[1].nextElementSibling.innerHTML = "You must put correct email";
    }
    else {
        element[1].setAttribute("class", "form-control is-valid");
        element[1].nextElementSibling.innerHTML = "";
        count++;
    }
    // check address
    if (!element[2]["value"].length) {
        element[2].setAttribute("class", "form-control is-invalid");
        element[2].nextElementSibling.innerHTML = "You must put correct address";
    }
    else {
        element[2].setAttribute("class", "form-control is-valid");
        element[2].nextElementSibling.innerHTML = "";
        count++;
    }
    //check phone
    if ((!element[3]["value"].length) || (!/^[\d\W]{10,}$/gm.test(element[3]["value"]))) {
        element[3].setAttribute("class", "form-control is-invalid");
        element[3].nextElementSibling.innerHTML = "You must put correct phone number";
    }
    else {
        element[3].setAttribute("class", "form-control is-valid");
        element[3].nextElementSibling.innerHTML = "";
        count++;
    }
    return count === 4;
}
function addEmployee() {
    if (validateInput(name, email, address, phone)) {
        //@ts-ignore
        $('#addEmployeeModal').modal('hide'); // modal available in bootstrap jquery
        employeeManager.addEmployee(name["value"], email["value"], address["value"], phone["value"]);
        renderEmployeeList(employeeManager);
        resetAddInput(name, email, address, phone);
    }
}
// Update Feature
//Get edit input element
let nameEdit = document.getElementById('name-edit');
let addressEdit = document.getElementById('address-edit');
let phoneEdit = document.getElementById('phone-edit');
let emailEdit = document.getElementById('email-edit');
let employeeNumberEdit = document.getElementById('employee-number');
function updateEditBtn(employeeList) {
    let editBtn = document.getElementsByClassName("edit");
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", () => {
            resetAddInput(nameEdit, emailEdit, addressEdit, phoneEdit);
            if (document.getElementById("search-input")["value"] && employeeList) {
                try {
                    nameEdit["value"] = employeeList[i]["_name"];
                    addressEdit["value"] = employeeList[i]["_address"];
                    phoneEdit["value"] = employeeList[i]["_phone"];
                    emailEdit["value"] = employeeList[i]["_email"];
                    employeeNumberEdit["data"] = i.toString();
                    updateSaveEditBtn(employeeList);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                nameEdit["value"] = employeeManager.employeeList[i]["_name"];
                addressEdit["value"] = employeeManager.employeeList[i]["_address"];
                phoneEdit["value"] = employeeManager.employeeList[i]["_phone"];
                emailEdit["value"] = employeeManager.employeeList[i]["_email"];
                employeeNumberEdit["data"] = i.toString();
                updateSaveEditBtn();
            }
        });
    }
}
function updateSaveEditBtn(employeeList) {
    let saveEditBtn = document.getElementById("save-edit");
    saveEditBtn.addEventListener("click", () => {
        if (document.getElementById("search-input")["value"] && employeeList) {
            updateEmployee(employeeNumberEdit["data"], employeeList);
        }
        else {
            updateEmployee(employeeNumberEdit["data"], employeeManager.employeeList);
        }
    });
}
// function resetEditBtn(): void {
//     nameEdit["value"] = "";
//     addressEdit["value"] = "";
//     phoneEdit["value"] = "";
//     emailEdit["value"] = ""
// }
function updateEmployee(i, employeeList) {
    if (validateInput(nameEdit, emailEdit, addressEdit, phoneEdit)) {
        //@ts-ignore
        $("#editEmployeeModal").modal("hide");
        employeeList[i]["_name"] = nameEdit["value"];
        employeeList[i]["_address"] = addressEdit["value"];
        employeeList[i]["_phone"] = phoneEdit["value"];
        employeeList[i]["_email"] = emailEdit["value"];
        renderEmployeeList(employeeList);
        employeeManager.saveEmployeeListToLocal();
    }
    // resetAddInput(nameEdit, emailEdit, addressEdit, phoneEdit);
    // resetEditBtn();
}
//Delete Feature
// Get delete buttons element
let numberIndex = document.getElementById(("remove-employee-index"));
let deleteBtn = document.getElementsByClassName(("delete"));
function updateDeleteBtn() {
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", () => {
            numberIndex["data"] = i;
            updateDeleteConfirmBtn();
        });
    }
}
function updateDeleteConfirmBtn() {
    let confirmDelete = document.getElementById("delete-btn");
    confirmDelete.addEventListener("click", () => {
        deleteEmployee(numberIndex["data"]);
    });
}
function deleteEmployee(index) {
    employeeManager.removeEmployee(index);
    renderEmployeeList(employeeManager);
}
// Search feature
function updateSearchInput() {
    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        callSearchFunction(searchInput);
    });
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            callSearchFunction(searchInput);
        }
    });
}
function callSearchFunction(searchInput) {
    console.log(searchInput["value"]);
    searchData(searchInput["value"], employeeManager.employeeList, "_name", "_email", "_address");
}
function searchData(data, arr, ...field) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        switch (true) {
            case arr[i][field[0]].toLowerCase().includes(data.toLowerCase()):
            case data.toLowerCase().includes(arr[i][field[0]].toLowerCase()):
            case arr[i][field[1]].toLowerCase().includes(data.toLowerCase()):
            case data.toLowerCase().includes(arr[i][field[1]].toLowerCase()):
            case arr[i][field[2]].toLowerCase().includes(data.toLowerCase()):
            case data.toLowerCase().includes(arr[i][field[2]].toLowerCase()):
                result.push(arr[i]);
                break;
        }
    }
    console.log(data);
    renderEmployeeList(result, data);
    updateEditBtn(result);
    return result;
}
updateSortButton();
// Feature sort
function updateSortButton() {
    let flagForNameSort = false;
    let flagForEmailSort = false;
    let flagForAddressSort = false;
    let flag;
    let sortNameButton = document.getElementById("sort-name-asc");
    let sortEmailButton = document.getElementById("sort-email-asc");
    let sortAddressButton = document.getElementById("sort-address-asc");
    let sortDefault = document.getElementById("manage-employees");
    [sortNameButton, sortEmailButton, sortAddressButton, sortDefault].forEach((sortButton) => {
        sortButton.addEventListener("click", () => {
            switch (sortButton.id) {
                case "sort-name-asc":
                    flagForNameSort = !flagForNameSort;
                    flag = flagForNameSort;
                    break;
                case "sort-email-asc":
                    flagForEmailSort = !flagForEmailSort;
                    flag = flagForEmailSort;
                    break;
                case "sort-address-asc":
                    flagForAddressSort = !flagForAddressSort;
                    flag = flagForAddressSort;
                    break;
                case "manage-employees":
                    flag = true;
                    break;
            }
            sortEmployee(sortButton.id, flag);
        });
    });
}
function updateDefaultSort() {
    $("#manage-employees").on("click", () => {
    });
}
function sortEmployee(sortButtonId, flag) {
    let field;
    switch (sortButtonId) {
        case "sort-name-asc":
            field = "_name";
            break;
        case "sort-email-asc":
            field = "_email";
            break;
        case "sort-address-asc":
            field = "_address";
            break;
        case "manage-employees":
            field = "_createAt";
            break;
    }
    // console.log(field);
    let arr = employeeManager.employeeList;
    let j;
    let temp2;
    if (flag) {
        for (let i = 1; i < arr.length; i++) {
            temp2 = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j][field] > temp2[field]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp2;
        }
        flag = false;
    }
    else {
        for (let i = 1; i < arr.length; i++) {
            temp2 = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j][field] < temp2[field]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp2;
        }
        flag = true;
    }
    // console.log(flag)
    renderEmployeeList(employeeManager.employeeList);
    employeeManager.saveEmployeeListToLocal();
}
// Delete multi faeture
// Update checkbox
function updateCheckbox(employeeList) {
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
    });
    updateMultiDeleteBtn(employeeList);
}
function updateMultiDeleteBtn(employeeList) {
    let multiDeleteBtn = document.getElementById("delete-multi-btn");
    multiDeleteBtn.addEventListener("click", () => {
        // removeMultiEmployee()
        // console.log("Multi delete")
        removeMultiEmployee(employeeList);
    });
}
function removeMultiEmployee(employeeList) {
    let checkbox = document.querySelectorAll('table tbody input[type="checkbox"]');
    let listID = [];
    let result = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i]["checked"]) {
            listID.push(i);
        }
    }
    // console.log(listID)
    if (document.getElementById("search-input")["value"] && employeeList) {
        result = employeeList.filter((employee, index) => {
            return listID.indexOf(index) === -1;
        });
    }
    else {
        result = employeeManager.employeeList.filter((employee, index) => {
            return listID.indexOf(index) === -1;
        });
        console.log("result");
        employeeManager.setEmployeeList(result);
    }
    // employeeManager.setEmployeeList(result);
    // console.log(result)
    renderEmployeeList(employeeManager.employeeList);
    employeeManager.saveEmployeeListToLocal();
}
// Render List Method (Read feature)
function renderEmployeeList(employeeMnr, searchValue) {
    let html = "";
    let arr;
    if (employeeMnr instanceof EmployeeManager) {
        arr = employeeMnr.employeeList;
    }
    else {
        arr = employeeMnr;
    }
    const replacer = (match) => {
        return `<strong style="color: orangered">${match}</strong>`;
    };
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
                    <input type="checkbox" class="delete-checkbox" id="checkbox${i}" name="options[]" value="${i}">
                    <label for="checkbox${i}"></label>
                    </span>
            </td>
            `;
            html += `<td>${i + 1}</td>`;
            if (searchValue) {
                let regExp = new RegExp(searchValue, 'gim');
                html += `<td>${arr[i]["_name"].replace(regExp, replacer)}</td>`;
                html += `<td>${arr[i]["_email"].replace(regExp, replacer)}</td>`;
                html += `<td>${arr[i]["_address"].replace(regExp, replacer)}</td>`;
            }
            else {
                html += `<td>${arr[i]["_name"]}</td>`;
                html += `<td>${arr[i]["_email"]}</td>`;
                html += `<td>${arr[i]["_address"]}</td>`;
            }
            html += `<td>${arr[i]["_phone"]}</td>`;
            html += `<td>
                     <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
                                                                                         data-toggle="tooltip"
                                                                                         title="Edit">&#xE254;</i></a>
                     <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons"
                                                                                             data-toggle="tooltip"
                                                                                             title="Delete">&#xE872;</i></a>
                    </td>`;
            html += "</tr>";
        }
    }
    // if (searchData) {
    //     let regExp = new RegExp('searchData', 'igm');
    //
    // }
    // console.log("this is html", html)
    document.getElementById('employee-list').innerHTML = html;
    document.getElementById("show-entries-quantity").innerHTML = `Showing <b>${arr.length}</b> out of  <b>${employeeManager.employeeList.length}</b>  entries`;
    updateAddBtn();
    updateEditBtn();
    updateDeleteBtn();
    if (employeeMnr instanceof EmployeeManager) {
        updateCheckbox();
    }
    else {
        updateCheckbox(employeeMnr);
    }
    // updateMultiDeleteBtn();
}
//# sourceMappingURL=Main.js.map