export default class ProductModel{

    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

    static getProducts(){
      return products;
    }

    static getById(id){
      return products.find((p)=> p.id == id);
    }
    
    static addProducts(productObj){
      let newProduct = new ProductModel(
        products.length +1,
        productObj.name,
        productObj.desc,
        productObj.price,
        productObj.imageUrl,
      );
      products.push(newProduct);
    }

    static updateProduct(productObj) {
    // Use Number() to ensure we are comparing numbers to numbers
      const index = products.findIndex((p) => p.id == Number(productObj.id));
      
      if (index !== -1) {
          // Overwrite the existing slot with the new data
        products[index] = new ProductModel(
          Number(productObj.id), // Keep ID as a Number
          productObj.name,
          productObj.desc,
          productObj.price,
          productObj.imageUrl
        );
      }
    }

    static deleteProduct(id){
      const index = products.findIndex((p)=> p.id == id);
      products.splice(index, 1);
    }

  }

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Atomic Habits',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]