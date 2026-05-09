export default class UserModel{
    constructor(_id, _name, _email, _password){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }

    static addUser(name, email, password){
        const newUser = new UserModel(users.length + 1, name, email, password);
        users.push(newUser);
    }

    static isValidUser(name, email, password){
        const result = users.find((u)=>
            u.name == name &&
            u.email == email &&
            u.password == password);
        return result;
    }
}

const users = [];