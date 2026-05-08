import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import ejsLayouts from "express-ejs-layouts";
// import { fileURLToPath } from 'url';

const server = express();

//View engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src","views"));

server.use(ejsLayouts);

//create an instance of the class
const productController = new ProductController();
server.get("/", productController.getProducts);
server.use(express.static('src/views'));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'src', 'views')));

server.listen(3400);