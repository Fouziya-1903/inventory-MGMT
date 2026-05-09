// import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController{
    getProducts(req,res, next){
        let products = ProductModel.getProducts();
        return res.render("products", { products }) 
        
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.ejs"));
    }

    getAddProduct(req, res, next){
        return res.render("new-product", {
            errorMessage : null,
        });
    }

    postAddProduct(req,res, next){
        ProductModel.addProducts(req.body);
        let products = ProductModel.getProducts();
        res.render("products", { products });
    }

    getUpdateProductView(req,res,next){
        const id = req.params.id; 
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render("update-product",{
                product : productFound,
                errorMessage : null,
            });
        }
        else{
            res.status(401).send("Product not found");
        }
    }

    postUpdateProductView(req, res){
        ProductModel.updateProduct(req.body);
        let products = ProductModel.getProducts();
        res.render("products", {products});

    }

    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("product not found"); 
        }
        ProductModel.deleteProduct(id);
        let products = ProductModel.getProducts(); 
        res.render("products", {products});
    }
}