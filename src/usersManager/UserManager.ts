import {User} from "./User.js";

export class UserManager {
    private usersList: Array<User> = JSON.parse(localStorage.getItem("usersList")) || [];

    constructor() {
    }

    addUser(newUser: User): void {
        this.usersList.push(newUser);
        this.saveUsersListToLocalStg();
    }

    getUsersList(): Array<User> {
        this.usersList = JSON.parse(localStorage.getItem("usersList"));
        return this.usersList || [];
    }

    setUsersList(usersList: Array<User>) {
        this.usersList = usersList;
        this.saveUsersListToLocalStg();
    }

    saveUsersListToLocalStg(): void {
        localStorage.setItem("usersList", JSON.stringify(this.usersList));
    }

    saveUser(firstName: string, lastName: string, emailAddress: string, passWord: string): void {

        let newUser = new User(firstName, lastName, emailAddress, passWord);
        this.addUser(newUser)
    }

    validateEmailSignUp(email : string) : boolean {
        return !!this.getUsersList().find((user) => {
            return user["_emailAddress"] === email;
        })
    }

    authenticateUser(email : string, password: string) : boolean {
        return !!this.getUsersList().find((user) => {
           return user["_emailAddress"] === email && user["_password"] === password
        })
    }



}