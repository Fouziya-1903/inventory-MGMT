import express, { urlencoded } from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validateRequest from './src/middlewares/validation.middleware.js';
// import { fileURLToPath } from 'url';

const server = express();

//View engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src","views"));

server.use(ejsLayouts);
// We need to make sure that the data is parsed in the correct way for the products to be displayed, so we use urlencoded for that
server.use(express.urlencoded({extended : true}));

//create an instance of the class and should usually be on the top
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/newForm", productController.getAddForm);
server.get("/new-product", productController.getAddProduct);
server.get('/update-product/:id',productController.getUpdateProductView); 
server.post('/update-product', productController.postUpdateProductView);
server.post("/",validateRequest,productController.postAddProduct);
server.use(express.static('src/views'));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'src', 'views')));

server.listen(3400);