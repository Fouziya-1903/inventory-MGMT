import express, { urlencoded } from 'express';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validateRequest from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
// import { fileURLToPath } from 'url';

const server = express();

server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({extended : true}));
server.use(express.static("public"));


//View engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src","views"));

// We need to make sure that the data is parsed in the correct way for the products to be displayed, so we use urlencoded for that

//create an instance of the class and should usually be on the top
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new-product", productController.getAddProduct);
server.get('/update-product/:id',productController.getUpdateProductView); 
server.post('/delete-product/:id',productController.deleteProduct);

const userController = new UserController();
server.get("/register", userController.getRegister);

server.post("/", uploadFile.single('imageUrl'), validateRequest, productController.postAddProduct);
server.post('/update-product', uploadFile.single('imageUrl'), productController.postUpdateProductView);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// server.use(express.static(path.join(__dirname, 'src', 'views')));

server.listen(3400);