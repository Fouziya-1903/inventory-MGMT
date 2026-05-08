import express from 'express';
import ProductController from './src/controllers/product.controller.js';
// import path from "path";
// import { fileURLToPath } from 'url';

const server = express();

//create an instance of the class
const productController = new ProductController();
server.get("/", productController.getProducts);
server.use(express.static('src/views'));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'src', 'views')));

server.listen(3400);