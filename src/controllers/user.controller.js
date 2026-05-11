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
        req.session.userEmail = email;
        let products = ProductModel.getProducts();
        return res.render("products", {products, userEmail: req.session.userEmail });
    }

    logout(req, res){
        //On logout, destroy the session
        res.clearCookie('lastVisit');

        req.session.destroy((err)=>{
            if(err){
                console.log(err);
                return res.redirect("/login");
            }else{
                res.redirect('/login');
            }
        });
    }
}