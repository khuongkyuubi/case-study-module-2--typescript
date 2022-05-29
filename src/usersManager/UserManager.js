import { User } from "./User.js";
export class UserManager {
    constructor() {
        this.usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    }
    addUser(newUser) {
        this.usersList.push(newUser);
        this.saveUsersListToLocalStg();
    }
    getUsersList() {
        this.usersList = JSON.parse(localStorage.getItem("usersList"));
        return this.usersList || [];
    }
    setUsersList(usersList) {
        this.usersList = usersList;
        this.saveUsersListToLocalStg();
    }
    saveUsersListToLocalStg() {
        localStorage.setItem("usersList", JSON.stringify(this.usersList));
    }
    saveUser(firstName, lastName, emailAddress, passWord) {
        let newUser = new User(firstName, lastName, emailAddress, passWord);
        this.addUser(newUser);
    }
    validateEmailSignUp(email) {
        return !!this.getUsersList().find((user) => {
            return user["_emailAddress"] === email;
        });
    }
    authenticateUser(email, password) {
        return !!this.getUsersList().find((user) => {
            return user["_emailAddress"] === email && user["_password"] === password;
        });
    }
}
//# sourceMappingURL=UserManager.js.map