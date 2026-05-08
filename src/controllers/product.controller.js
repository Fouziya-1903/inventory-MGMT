// import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController{
    getProducts(req,res, next){
        let products = ProductModel.get();
        return res.render("index", { products }) 
        
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.ejs"));
    }

    getAddForm(req, res, next){
        res.render("new-product");
    }

    getAddProduct(req, res, next){
        res.render("new-product", {
            errorMessage : null,
        });
    }

    postAddProduct(req,res, next){
        const{name, price, imageUrl} = req.body;

        let errors =[];
        if(!name || name.trim() == ""){
            errors.push("Name is required");
        }
        if(!price || price < 1){
            errors.push("Price must be a positive value");
        }
        
        try{
            const validUrl = new URL(imageUrl);
        }catch (err){
            errors.push("Invalid URL");
        }

        if(errors.length > 0){
            return res.render("new-product",{
                errorMessage: errors[0],
            });
        }

        console.log(req.body);
        ProductModel.addProducts(req.body);
        let products = ProductModel.get();
        return res.render("products", { products });
    }
}