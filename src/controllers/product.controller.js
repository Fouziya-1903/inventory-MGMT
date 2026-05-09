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

    postAddProduct(req,res){
        if(!req.file){
            return res.render("new-product",{
                errorMessage: "Image is required",
                productData: req.body
            });
        }
        const {name, desc, price} = req.body;
        const imageUrl = '/images/'+ req.file.filename;
        ProductModel.addProducts(name, desc, price, imageUrl);
        let products = ProductModel.getProducts();
        res.redirect("/");
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
        const{id, name,desc, price, oldImageUrl} = req.body;
        const finalImageUrl = req.file ? ("/images/" + req.file.filename) : oldImageUrl;
        const updatedObj = {
            id: id,
            name : name,
            desc: desc,
            price: price,
            imageUrl: finalImageUrl
        };
        ProductModel.updateProduct(updatedObj);
        res.redirect("/");

    }

    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("product not found"); 
        }
        ProductModel.deleteProduct(id);
        res.redirect("/");
    }
}