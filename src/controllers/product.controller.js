// import path from "path";

import ProductModel from "../models/product.model.js";
export default class ProductController{
    getProducts(req,res){
        let products = ProductModel.get();
        return res.render("products",{products: products}) 
        
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.ejs"));
    }

    getAddForm(req, res){
        res.render("new-product");
    }

    addNewProduct(req,res){
        console.log(req.body);
        ProductModel.addProducts(req.body);
        let products = ProductModel.get();
        return res.render("products", { products });
    }
}