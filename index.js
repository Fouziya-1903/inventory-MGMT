import express, { urlencoded } from 'express';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import {validateRequest , validateUserRequest} from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { lastVisit } from './src/middlewares/lastVisit.middleware.js';
// import { fileURLToPath } from 'url';

const server = express();

server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({extended : true}));
server.use(express.static("public"));
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized : true,
    cookie: {secure: false},
})
);
server.use(cookieParser());
// server.use(lastVisit);

//View engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src","views"));

// We need to make sure that the data is parsed in the correct way for the products to be displayed, so we use urlencoded for that

//create an instance of the class and should usually be on the top
const productController = new ProductController();
server.get("/", auth, lastVisit, productController.getProducts);
server.get("/new-product", auth, productController.getAddProduct);
server.get('/update-product/:id', auth, productController.getUpdateProductView); 
server.post('/delete-product/:id', auth, productController.deleteProduct);
server.post("/", auth,  uploadFile.single('imageUrl'), validateRequest, productController.postAddProduct);
server.post('/update-product', auth,  uploadFile.single('imageUrl'), productController.postUpdateProductView);

const userController = new UserController();
server.get("/register", userController.getRegister);
server.get('/login', userController.getLogin);
server.post('/register', validateUserRequest, userController.postRegister);
server.post('/login',validateUserRequest, userController.postLogin);
server.get('/logout', userController.logout);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// server.use(express.static(path.join(__dirname, 'src', 'views')));

server.listen(3400,()=>{
    console.log("Server is running on port 3400");
});