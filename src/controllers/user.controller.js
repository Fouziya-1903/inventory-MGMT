import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
export default class UserController{
    getRegister(req , res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login',{
            errorMessage: null,
        });
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.addUser(name, email, password);
        res.render('login', {errorMessage: null});
    }

    postLogin(req, res){
        const {name, email, password} = req.body;
        const user = UserModel.isValidUser(name, email, password);
        if(!user){
            return res.render('login',{
                errorMessage: "Invalid Credentials",
            });
        }
        let products = ProductModel.getProducts();
        return res.render("products", {products});
    }
}